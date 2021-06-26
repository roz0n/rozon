import styles from "../../styles/Pages/Post/Post.module.css";
import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import swift from "highlight.js/lib/languages/swift";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIcon from "../../public/images/icons/arrow-back-icon.svg";
import CommentsIcon from "../../public/images/icons/comments-icon.svg";
import ShareIcon from "../../public/images/icons/share-icon.svg";

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

  console.log("Posts:", req);
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

  useEffect(() => {
    hljs.initHighlighting();
  }, [post]);

  if (router.isFallback) {
    return <h1>Now loading...</h1>;
  } else {
    return (
      <>
        {/* // TODO: This should reuse Layout and make it dynamic */}
        <header className={styles.header}>
          <Image
            src={ArrowBackIcon}
            alt="An icon of an backward facing arrow"
          />
          <Link href="/">
            <a>All posts</a>
          </Link>
        </header>
        <div className={styles.layout__REMOVE}>
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
                <p className={styles.byLine}>July 26, 1993</p>
              </div>

              <div className={styles.postControlsContainer}>
                <span className={styles.commentsCountContainer}>
                  <Image
                    src={CommentsIcon}
                    alt="A speech bubble icon to indicate comments"
                  />
                  <small className={styles.commentsCountLabel}>6</small>
                </span>

                <span className={styles.shareButtonContainer}>
                  <Image src={ShareIcon} alt="A typical share icon" />
                </span>
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

            <figure className={styles.postDisplayImageContainer}>
              {/* <Image alt="This blog post's display image" /> */}
            </figure>
          </article>

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
