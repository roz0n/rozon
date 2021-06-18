import styles from "../styles/FeatureSectionBlogPost.module.css";
import Link from "next/link";
import { FeatureSectionBlogPostProps } from "..";

const FeatureSectionBlogPost: React.FC<FeatureSectionBlogPostProps> = (
  props
) => {
  const { slug, title, excerpt } = props;

  return (
    <article className={styles.container}>
      <Link href={"/posts/[slug]"} as={`/posts/${slug}`}>
        <a>
          <h1 className={styles.title}>{title}</h1>
        </a>
      </Link>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default FeatureSectionBlogPost;