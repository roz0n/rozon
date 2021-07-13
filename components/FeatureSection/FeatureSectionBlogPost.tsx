import styles from "../../styles/FeatureSection/FeatureSectionBlogPost.module.css";
import Link from "next/link";
import { FeatureSectionBlogPostProps } from "../..";

const FeatureSectionBlogPost: React.FC<FeatureSectionBlogPostProps> = (
  props
) => {
  const { slug, title, excerpt } = props;

  return (
    <article className={styles.container}>
      <section>
        <span>
          <Link href={"/posts/[slug]"} as={`/posts/${slug}`}>
            <a>
              <h1 className={styles.title}>{title}</h1>
            </a>
          </Link>
          <div className={styles.date}>{new Date().toDateString()}</div>
        </span>
      </section>

      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default FeatureSectionBlogPost;
