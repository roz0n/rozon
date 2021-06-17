import styles from "../styles/Home.module.scss";
import Ghost from "../ghost";
import { Post } from "..";
import Link from "next/link";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Lede from "../components/Lede";

// Data

async function getCreations() {
  const posts = await Ghost.posts.browse({
    include: ["tags", "authors"],
    filter: "tag:creations",
  });

  console.log("Creations:", posts);
  return posts;
}

async function getThoughts() {
  const posts = await Ghost.posts.browse({
    include: ["tags", "authors"],
    filter: "tag:thoughts",
  });

  console.log("Thoughts:", posts);
  return posts;
}

// Props

export const getStaticProps = async ({ params }) => {
  const creations = await getCreations();
  const thoughts = await getThoughts();

  return {
    props: { creations, thoughts },
    revalidate: 30,
  };
};

const Home: React.FC<{ creations: Post[]; thoughts: Post[] }> = (props) => {
  const { creations, thoughts } = props;

  return (
    <Layout>
      <main className={styles.container}>
        <Header />

        <Lede />

        <section>
          <h2>Creations</h2>

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
        </section>

        <section>
          <h2>Thoughts</h2>

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
        </section>
      </main>
    </Layout>
  );
};

export default Home;
