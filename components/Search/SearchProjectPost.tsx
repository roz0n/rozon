import styles from "../../styles/Pages/Search/SearchProjectPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { FeatureSectionProjectPostProps } from "../..";
import SampleAppIcon from "../../public/images/icons/sample-app-icon.svg";

const SearchProjectPost: React.FC<FeatureSectionProjectPostProps> = (props) => {
  const { slug, title, excerpt } = props;

  return (
    <article className={styles.container}>
      <section className={styles.headerSectionContainer}>
        <article className={styles.headerContainer}>
          <div className={styles.appIconContainer}>
            <Image
              src={SampleAppIcon}
              height="50"
              width="50"
              alt={`${title} app icon`}
            />
          </div>

          <div className={styles.titleContainer}>
            <Link href={"/posts/[slug]"} as={`/posts/${slug}`}>
              <a>
                <h3 className={styles.title}>{title}</h3>
              </a>
            </Link>
            <ul className={styles.tagList}>
              <li className={styles.tagChip}>Swift</li>
              <li className={styles.tagChip}>CoreML</li>
              <li className={styles.tagChip}>AVKit</li>
            </ul>
          </div>
        </article>
      </section>

      <section>
        <p className={styles.excerpt}>{excerpt}</p>
      </section>
    </article>
  );
};

export default SearchProjectPost;
