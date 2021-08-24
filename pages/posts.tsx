import styles from "../styles/Pages/Posts/PostsList.module.css";
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

const PostsList: React.FC<AllPageProps> = ({ posts }) => {
  return (
    <article className={styles.container}>
      <ContentLayout direction={"column"}>
        <section className={styles.headerContainer}>
          <h1 className={styles.header}>All Posts</h1>
          <p className={styles.subheader}>
            {posts.length} total {posts?.length > 1 ? "posts" : "post"} returned
          </p>
        </section>

        <section>
          {posts?.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.published_at}
              image={post.feature_image}
            />
          ))}
        </section>
      </ContentLayout>
    </article>
  );
};

export default PostsList;
