import { IndexPageProps, Post } from "..";
import styles from "../styles/Home.module.css";
import Ghost from "../ghost";
import Link from "next/link";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Lede from "../components/Lede";
import FeatureSection from "../components/FeatureSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

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
      <main className={styles.container}>
        <Header />
        <Lede />
        <FeatureSection title={"Creations"}>
          {creations.map((post, i) => (
            <div key={post.slug}>
              <Link href={"/posts/[slug]"} as={`/posts/${post.slug}`}>
                <a>
                  <h1>{post.title}</h1>
                </a>
              </Link>
              <p>{post.custom_excerpt}</p>
            </div>
          ))}
        </FeatureSection>

        <FeatureSection title={"Thoughts"}>
          {thoughts.map((post, i) => (
            <div key={post.slug}>
              <Link href={"/posts/[slug]"} as={`/posts/${post.slug}`}>
                <a>
                  <h1>{post.title}</h1>
                </a>
              </Link>
              <p>{post.custom_excerpt}</p>
            </div>
          ))}
        </FeatureSection>

        <ContactForm />

        <Footer />
      </main>
    </Layout>
  );
};

export default Home;
