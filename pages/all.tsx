import styles from "../styles/Pages/All/All.module.css";
import { AllPageProps } from "..";
import { getPostsByPrimaryTag } from "../lib/ghost";
import { POSTS } from "../utils/constants";
import BlogPostCard from "../components/Cards/BlogPostCard";
import ContentLayout from "../components/Layouts/ContentLayout";

export const getStaticProps = async () => {
  let props: AllPageProps = {};

  try {
    const posts = await getPostsByPrimaryTag(POSTS);
    props.posts = posts;
  } catch (error) {
    props.postsError = true;
  }

  return {
    props,
    revalidate: 30,
  };
};

const All: React.FC<AllPageProps> = ({ posts }) => {
  return (
    <article className={styles.container}>
      <ContentLayout direction={"column"}>
        <section>
          <h1 className={styles.header}>Posts</h1>
        </section>

        <section>
          {posts?.map((post) => (
            <BlogPostCard
              title={post.title}
              description={post.excerpt}
              image={post.feature_image}
            />
          ))}
        </section>
      </ContentLayout>
    </article>
  );
};

export default All;
