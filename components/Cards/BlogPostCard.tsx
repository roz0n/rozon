import styles from "../../styles/Cards/BlogPostCard.module.css";
import { formatDateToLocale } from "../../utils/dateUtils";
import Link from "next/dist/client/link";

const BlogPostCard = ({ slug, title, excerpt, date, image }) => {
  return (
    <article className={styles.container}>
      <figure
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${image})` }}
      ></figure>

      <section>
        <Link href={"/post/[slug]"} as={`/post/${slug}`}>
          <a>
            <h1 className={styles.title}>{title}</h1>
          </a>
        </Link>
        <p className={styles.date}>{formatDateToLocale(date)}</p>
        <p className={styles.excerpt}>{excerpt}</p>
      </section>
    </article>
  );
};

export default BlogPostCard;
