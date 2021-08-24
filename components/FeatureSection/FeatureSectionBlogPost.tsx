import styles from "../../styles/FeatureSection/FeatureSectionBlogPost.module.css";
import Link from "next/link";
import { FeatureSectionBlogPostProps } from "../..";
import { formatDateToLocale } from "../../utils/dateUtils";

const FeatureSectionBlogPost: React.FC<FeatureSectionBlogPostProps> = (
  props
) => {
  const { slug, title, excerpt, date } = props;

  return (
    <article className={styles.container}>
      <section>
        <span>
          <Link href={"/post/[slug]"} as={`/post/${slug}`}>
            <a>
              <h1 className={styles.title}>{title}</h1>
            </a>
          </Link>
          <div className={styles.date}>{formatDateToLocale(date)}</div>
        </span>
      </section>

      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default FeatureSectionBlogPost;
