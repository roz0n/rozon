import styles from "../../styles/Pages/Search/SearchBlogPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { FeatureSectionProjectPostProps } from "../..";
import SampleAppIcon from "../../public/images/icons/sample-app-icon.svg";

const SearchBlogPost: React.FC<FeatureSectionProjectPostProps> = (props) => {
  const { slug, title, excerpt } = props;

  return (
    <article className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.date}>{new Date().toDateString()}</p>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  );
};

export default SearchBlogPost;
