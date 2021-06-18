import { IndexPageProps, Post } from "..";
import styles from "../styles/Home.module.css";
import text from "../text/Index.text";
import Ghost from "../ghost";
import Head from "next/head";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Lede from "../components/Lede";
import FeatureSection from "../components/FeatureSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import FeatureSectionProjectPost from "../components/FeatureSectionProjectPost";
import FeatureSectionBlogPost from "../components/FeatureSectionBlogPost";

// Data

async function getCreations() {
  try {
    const posts = await Ghost.posts.browse({
      include: ["tags", "authors"],
      filter: "tag:creations",
    });

    console.log("Creations:", posts);
    return posts;
  } catch (error) {
    throw new Error("Unable to fetch Creations");
  }
}

async function getThoughts() {
  try {
    const posts = await Ghost.posts.browse({
      include: ["tags", "authors"],
      filter: "tag:thoughts",
    });

    console.log("Thoughts:", posts);
    return posts;
  } catch (error) {
    throw new Error("Unable to fetch Thoughts");
  }
}

// Props

export const getStaticProps = async ({ params }) => {
  let props: IndexPageProps = {};

  try {
    const creations = await getCreations();
    const thoughts = await getThoughts();

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
    <Layout>
      <Head>
        <title>Arnold Rozon &middot; Engineering &amp; Design</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className={styles.container}>
        <Header />
        <Lede />

        <FeatureSection title={text.primaryFeatureSectionHeader["en"]}>
          {creations.map((post) => (
            <FeatureSectionProjectPost
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.custom_excerpt}
            />
          ))}
        </FeatureSection>

        <FeatureSection title={text.secondaryFeatureSectionHeader["en"]}>
          {thoughts.map((post) => (
            <FeatureSectionBlogPost
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.custom_excerpt}
            />
          ))}
        </FeatureSection>

        <ContactForm />
        <Footer />
      </main>
    </Layout>
  );
};

export default Home;
