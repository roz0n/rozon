import { IndexPageProps, Post } from "..";
import styles from "../styles/Pages/Home/Home.module.css";
import text from "../text/Index.text";
import { getPostsByPrimaryTag } from "../lib/ghost";
import HomeLede from "../components/Home/HomeLede";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import ContactForm from "../components/ContactForm/ContactForm";
import FeatureSectionProjectPost from "../components/FeatureSection/FeatureSectionProjectPost";
import FeatureSectionBlogPost from "../components/FeatureSection/FeatureSectionBlogPost";
import FeatureSectionButton from "../components/FeatureSection/FeatureSectionButton";

// TODO: When creating posts in Ghost, be sure to use the standard tags and not the frontend-centric "creations" and "thoughts"
const PROJECTS = "creations";
const BLOG_POSTS = "thoughts";

export const getStaticProps = async () => {
  let props: IndexPageProps = {};

  try {
    const projects = await getPostsByPrimaryTag(PROJECTS);
    props.projects = projects;
  } catch (error) {
    props.projectsError = true;
  }

  try {
    const blogPosts = await getPostsByPrimaryTag(BLOG_POSTS);
    props.blogPosts = blogPosts;
  } catch (error) {
    props.blogPostsError = true;
  }

  return {
    props,
    revalidate: 30,
  };
};

const Home: React.FC<IndexPageProps> = ({
  projects,
  blogPosts,
  projectsError,
  blogPostsError,
}) => {
  return (
    <main className={styles.container}>
      <HomeLede />
      <FeatureSection title={text.primaryFeatureSectionHeader["en"]}>
        <div className={styles.primaryFeatureSectionWrapper}>
          {projects?.map((post) => (
            <FeatureSectionProjectPost
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.custom_excerpt}
            />
          ))}
          {projects?.map((post) => (
            <FeatureSectionProjectPost
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.custom_excerpt}
            />
          ))}
        </div>
        <FeatureSectionButton />
      </FeatureSection>
      <FeatureSection title={text.secondaryFeatureSectionHeader["en"]}>
        {blogPosts?.map((post) => (
          <FeatureSectionBlogPost
            key={post.slug}
            slug={post.slug}
            title={post.title}
            excerpt={post.custom_excerpt}
          />
        ))}
        <FeatureSectionButton />
      </FeatureSection>
      <ContactForm />
    </main>
  );
};

export default Home;
