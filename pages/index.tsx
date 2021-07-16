import { IndexPageProps } from "..";
import styles from "../styles/Pages/Home/Home.module.css";
import text from "../text/Index.text";
import { getPostsByPrimaryTag } from "../lib/ghost";
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import HomeLede from "../components/Home/HomeLede";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import ContactForm from "../components/ContactForm/ContactForm";
import FeatureSectionProjectPost from "../components/FeatureSection/FeatureSectionProjectPost";
import FeatureSectionBlogPost from "../components/FeatureSection/FeatureSectionBlogPost";
import FeatureSectionButton from "../components/FeatureSection/FeatureSectionButton";
import FeatureSectionEmptyState from "../components/FeatureSection/FeatureSectionEmptyState";

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
        {projects && !projectsError ? (
          <>
            <div className={styles.gridFeatureSectionWrapper}>
              {projects.map((post) => (
                <FeatureSectionProjectPost
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.custom_excerpt}
                />
              ))}
              {projects.map((post) => (
                <FeatureSectionProjectPost
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.custom_excerpt}
                />
              ))}
            </div>
            <Link href="/all" passHref>
              <span>
                <FeatureSectionButton />
              </span>
            </Link>
          </>
        ) : (
          <FeatureSectionEmptyState
            label={"No projects at the moment. Please check back later."}
          >
            <ExclamationCircleIcon height={24} width={24} />
          </FeatureSectionEmptyState>
        )}
      </FeatureSection>
      <FeatureSection title={text.secondaryFeatureSectionHeader["en"]}>
        {blogPosts && !blogPostsError ? (
          <>
            {blogPosts.map((post) => (
              <FeatureSectionBlogPost
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.custom_excerpt}
              />
            ))}
            <Link href="/all" passHref>
              <span>
                <FeatureSectionButton />
              </span>
            </Link>
          </>
        ) : (
          <FeatureSectionEmptyState
            label={"No posts at the moment. Please check back later."}
          >
            <ExclamationCircleIcon height={24} width={24} />
          </FeatureSectionEmptyState>
        )}
      </FeatureSection>
      <ContactForm />
    </main>
  );
};

export default Home;
