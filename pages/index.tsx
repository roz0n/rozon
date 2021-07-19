import { IndexPageProps } from "..";
import styles from "../styles/Pages/Home/Home.module.css";
import text from "../text/Index.text";
import { getPostsByPrimaryTag } from "../lib/ghost";
import { useState } from "react";
import Link from "next/link";
import { DesktopComputerIcon, AnnotationIcon } from "@heroicons/react/solid";
import HomeLede from "../components/Home/HomeLede";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import ContactForm from "../components/ContactForm/ContactForm";
import FeatureSectionProjectPost from "../components/FeatureSection/FeatureSectionProjectPost";
import FeatureSectionBlogPost from "../components/FeatureSection/FeatureSectionBlogPost";
import FeatureSectionButton from "../components/FeatureSection/FeatureSectionButton";
import FeatureSectionEmptyState from "../components/FeatureSection/FeatureSectionEmptyState";
import { PROJECTS, POSTS } from "../utils/constants";

export const getStaticProps = async () => {
  let props: IndexPageProps = {};

  try {
    const projects = await getPostsByPrimaryTag(PROJECTS);
    props.projects = projects;
  } catch (error) {
    props.projectsError = true;
  }

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

const Home: React.FC<IndexPageProps> = ({
  projects,
  posts,
  projectsError,
  postsError,
}) => {
  const [hideProjects, setHideProjects] = useState(false);
  const [hidePosts, setHidePosts] = useState(true);

  console.log("projects", projects);

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
                  image={post.feature_image}
                  html={post.html}
                  tags={post.tags}
                />
              ))}
            </div>
            {/* <Link
              href={{ pathname: "/search", query: { type: PROJECTS } }}
              passHref
            >
              <span>
                <FeatureSectionButton label={"View Projects"}>
                  <DesktopComputerIcon height={20} width={20} />
                </FeatureSectionButton>
              </span>
            </Link> */}
          </>
        ) : (
          <FeatureSectionEmptyState
            label={"No projects at the moment. Please check back later."}
          >
            <DesktopComputerIcon height={24} width={24} />
          </FeatureSectionEmptyState>
        )}
      </FeatureSection>
      {!hidePosts && (
        <FeatureSection title={text.secondaryFeatureSectionHeader["en"]}>
          {posts && !postsError ? (
            <>
              {posts.map((post) => (
                <FeatureSectionBlogPost
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.custom_excerpt}
                />
              ))}
              <Link
                href={{ pathname: "/search", query: { type: POSTS } }}
                passHref
              >
                <span>
                  <FeatureSectionButton label={"View Posts"}>
                    <AnnotationIcon height={20} width={20} />
                  </FeatureSectionButton>
                </span>
              </Link>
            </>
          ) : (
            <FeatureSectionEmptyState
              label={"No posts at the moment. Please check back later."}
            >
              <AnnotationIcon height={24} width={24} />
            </FeatureSectionEmptyState>
          )}
        </FeatureSection>
      )}
      <ContactForm />
    </main>
  );
};

export default Home;
