import Head from "next/head";
import styles from "../styles/Home.module.scss";

const CONTENT_API_KEY = "4355061798b55c1f2932c6caea";
const BLOG_URL = "https://rozon.herokuapp.com/";

export const getStaticProps = async ({ params }) => {
  const postTitles = await getPostTitles();
  return {
    props: { postTitles },
  };
};

type Post = {};

async function getPostTitles() {
  // https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=id,title,excerpt,reading_time,created_at,updatedAt,published_at`
  ).then((res) => res.json());
  const titles = res.posts.map((post) => post.title);

  console.log("Post titles:", titles);
  return titles;
}

const Home: React.FC<{ postTitles: string[] }> = (props) => {
  const { postTitles } = props;

  return (
    <div>
      {postTitles.map((title) => (
        <h1>{title}</h1>
      ))}
    </div>
  );
};

export default Home;
