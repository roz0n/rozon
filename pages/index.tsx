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

const CREATIONS = "creations";
const THOUGHTS = "thoughts";

export const getStaticProps = async ({ params }) => {
  let props: IndexPageProps = {};

  try {
    const creations = await getPostsByPrimaryTag(CREATIONS);
    const thoughts = await getPostsByPrimaryTag(THOUGHTS);

    props.creations = creations;
    props.thoughts = thoughts;
  } catch (error) {
    props.error = true;
  } finally {
    return {
      props,
      revalidate: 30,
    };
  }
};

const Home: React.FC<{ creations: Post[]; thoughts: Post[] }> = (props) => {
  const { creations, thoughts } = props;

  return (
    <main className={styles.container}>
      <HomeLede />
      <FeatureSection title={text.primaryFeatureSectionHeader["en"]}>
        <div className={styles.primaryFeatureSectionWrapper}>
          {creations?.map((post) => (
            <FeatureSectionProjectPost
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.custom_excerpt}
            />
          ))}
          {creations?.map((post) => (
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
        {thoughts?.map((post) => (
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
