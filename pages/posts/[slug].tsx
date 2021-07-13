import styles from "../../styles/Pages/Post/Post.module.css";
import { useEffect, useContext } from "react";
import hljs from "highlight.js/lib/core";
import swift from "highlight.js/lib/languages/swift";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import CommentsIcon from "../../components/Icons/CommentsIcon";
// import CommentsIcon from "../../public/images/icons/comments-icon.svg";
import { ThemeContext } from "../_app";

const { GHOST_API_KEY, GHOST_SITE_URL } = process.env;
hljs.registerLanguage("swift", swift);

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
    `${GHOST_SITE_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${GHOST_API_KEY}&fields=title,slug,custom_excerpt,reading_time,published_at,html`
  ).then((res) => res.json());

  // console.log("Posts:", req);
  return req.posts;
}

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post: post[0] ?? null,
      revalidate: 30,
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
  const theme = useContext(ThemeContext);

  useEffect(() => {
    hljs.initHighlighting();
  }, [post]);

  if (router.isFallback) {
    return <h1>Now loading...</h1>;
  } else {
    return (
      <>
        <header className={styles.header}>
          <Link href="/">
            <a className={styles.headerLink}>&#8592;&nbsp;&nbsp; All Posts</a>
          </Link>
        </header>
        <div className={styles.postContainer}>
          <div className={styles.categoryContainer}>
            <p>Development</p>
          </div>

          <article className={styles.titleContainer}>
            <h1 className={styles.title}>
              Classifying Experimental Graphic Design Trends with Vision,
              CoreML, AVKit, and JSDOM
            </h1>

            <section className={styles.postInfoContainer}>
              <div className={styles.byLineContainer}>
                <p className={styles.byLine}>By Arnold Rozon</p>
                <p className={styles.byLine}>July 26, 2021</p>
              </div>

              <div className={styles.postControlsContainer}>
                <Link href="/" passHref>
                  <span className={styles.commentsCountContainer}>
                    <CommentsIcon height={36} width={36} />
                    <small className={styles.commentsCountLabel}>6</small>
                  </span>
                </Link>
              </div>
            </section>

            <section>
              <h2 className={styles.subtitle}>
                Aliquam hendrerit maximus congue. Quisque convallis, felis ac
                iaculis porta, ante ligula euismod sapien, et molestie arcu eros
                at lacus. Nunc eget orci convallis felis fringilla gravida,
                consequat pretium mi. Quisque convallis, felis ac iaculis porta,
                ante ligula.
              </h2>
            </section>
          </article>

          <figure className={styles.postDisplayImageContainer}>
            {/* <Image alt="This blog post's display image" /> */}
            {/* <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption> */}
          </figure>
          <figcaption className={styles.postDisplayImageCaption}>
            Fig.1 - Trulli, Puglia, Italy.
          </figcaption>

          <section
            className={styles.postBody}
            dangerouslySetInnerHTML={{ __html: post.html }}
          ></section>
        </div>
      </>
    );
  }
};

export default Post;
