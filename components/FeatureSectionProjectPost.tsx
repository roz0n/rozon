import styles from "../styles/FeatureSection/FeatureSectionProjectPost.module.css";
import Link from "next/link";
import { FeatureSectionProjectPostProps } from "..";

const FeatureSectionProjectPost: React.FC<FeatureSectionProjectPostProps> = (
  props
) => {
  const { slug, title, excerpt } = props;

  return (
    <article className={styles.container}>
      <Link href={"/posts/[slug]"} as={`/posts/${slug}`}>
        <a>
          <h3 className={styles.title}>{title}</h3>
        </a>
      </Link>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default FeatureSectionProjectPost;
