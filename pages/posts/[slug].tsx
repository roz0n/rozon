import styles from "../../styles/Pages/Post/Post.module.css";
import { GhostPost } from "../../index";
import { useEffect, useContext } from "react";
// import { ThemeContext } from "../_app";
// import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPostBySlug } from "../../lib/ghost";
import hljs from "highlight.js/lib/core";
import swift from "highlight.js/lib/languages/swift";
import { formatDateToLocale } from "../../utils/dateUtils";
import CommentsIcon from "../../components/Icons/CommentsIcon";
// TODO: This could be its own component, e.g. not tied to `FeatureSection`
import FeatureSectionEmptyState from "../../components/FeatureSection/FeatureSectionEmptyState";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import BarSkeletonLoader from "../../components/SkeletonLoaders/BarSkeletonLoader";
import ContentLayout from "../../components/Layouts/ContentLayout";

hljs.registerLanguage("swift", swift);

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post: post,
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

const PostSkeletonLoader = () => {
  // TODO: Needs a light mode implementation
  return (
    <div className={styles.skeletonContainer}>
      <BarSkeletonLoader height="1rem" width="6.25rem" />
      <BarSkeletonLoader height="6.25rem" width="100%" />
      <BarSkeletonLoader height="1rem" width="7.813rem" />
      <BarSkeletonLoader height="4.688rem" width="100%" />
      <BarSkeletonLoader height="31.25rem" width="100%" />
      {Array.from(Array(30).keys()).map((i) => {
        return (
          <BarSkeletonLoader
            key={`skeletonLoader-${i}`}
            height=".5rem"
            width="100%"
          />
        );
      })}
    </div>
  );
};

const Post: React.FC<{ post: GhostPost }> = (props) => {
  const router = useRouter();
  const { post } = props;
  // TODO: We'll need this later
  // const theme = useContext(ThemeContext);

  // Highlight.js
  useEffect(() => {
    hljs.highlightAll();
  }, [post]);

  if (router.isFallback) {
    return (
      <ContentLayout>
        <PostSkeletonLoader />
      </ContentLayout>
    );
  } else {
    return (
      <>
        {/* <header className={styles.header}>
          <Link href="/">
            <a className={styles.headerLink}>&#8592;&nbsp;&nbsp; All Posts</a>
          </Link>
        </header> */}
        <ContentLayout>
          <div className={styles.postContainer}>
            <div className={styles.categoryContainer}>
              <p>Engineering</p>
            </div>

            <article className={styles.titleContainer}>
              <h1 className={styles.title}>{post?.title}</h1>

              <section className={styles.postInfoContainer}>
                <div className={styles.byLineContainer}>
                  {/* <p className={styles.byLine}>By Arnold Rozon</p> */}
                  <p className={styles.byLine}>
                    {formatDateToLocale(post?.published_at)}
                  </p>
                </div>

                {/* <div className={styles.postControlsContainer}>
                  <Link href="/" passHref>
                    <span className={styles.commentsCountContainer}>
                      <CommentsIcon height={36} width={36} />
                      <small className={styles.commentsCountLabel}>6</small>
                    </span>
                  </Link>
                </div> */}
              </section>

              <section>
                <h2 className={styles.subtitle}>{post?.custom_excerpt}</h2>
              </section>
            </article>

            <figure className={styles.postDisplayImageContainer}>
              <Image
                alt="This blog post's display image"
                src={post?.feature_image}
                width={"1200px"}
                height={"630px"}
                quality={100}
                className={styles.postDisplayImage}
              />
              {/* <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption> */}
            </figure>
            {/* <figcaption className={styles.postDisplayImageCaption}>
              Fig.1 - Trulli, Puglia, Italy.
            </figcaption> */}

            <section
              className={styles.postBody}
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></section>

            <section className={styles.commentsContainer}>
              <FeatureSectionEmptyState label="Comments are currently disabled">
                <ChatAlt2Icon height={24} width={24} />
              </FeatureSectionEmptyState>
            </section>
          </div>
        </ContentLayout>
      </>
    );
  }
};

export default Post;
