import Link from "next/link";
import { useRouter } from "next/router";

const { CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  id: string;
  title: string;
  slug: string;
  custom_excerpt: string;
  reading_time: string;
  published_at: string;
  html?: string;
};

async function getSinglePost(slug: String) {
  const req = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt,reading_time,published_at,html`
  ).then((res) => res.json());

  console.log("Posts:", req);
  return req.posts;
}

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post: post[0] ?? null,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC<{ post: Post }> = (props) => {
  const router = useRouter();
  const { post } = props;

  if (router.isFallback) {
    return <h1>Now loading...</h1>;
  }

  return (
    <div>
      <Link href="/">
        <a>Back</a>
      </Link>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  );
};

export default Post;
