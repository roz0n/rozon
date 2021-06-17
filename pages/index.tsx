import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

const { CONTENT_API_KEY, BLOG_URL } = process.env;

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();

  return {
    props: { posts },
    revalidate: 30
  };
};

type Post = {
  id: string;
  title: string;
  slug: string;
  custom_excerpt: string;
  reading_time: string;
  published_at: string;
};

async function getPosts() {
  const req = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=id,title,slug,custom_excerpt,reading_time,published_at`
  ).then((res) => res.json());

  console.log("Posts:", req);
  return req.posts;
}

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props;

  return (
    <div>
      {posts.map((post, i) => (
        <div key={post.slug}>
          <Link href={"/posts/[slug]"} as={`/posts/${post.slug}`}>
            <a>
              <h1>{post.title}</h1>
            </a>
          </Link>

          <p>{post.custom_excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
