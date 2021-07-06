import styles from "../styles/FeatureSection/FeatureSectionProjectPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { FeatureSectionProjectPostProps } from "..";
import SampleAppIcon from "../public/images/icons/sample-app-icon.svg";

const FeatureSectionProjectPost: React.FC<FeatureSectionProjectPostProps> = (
  props
) => {
  const { slug, title, excerpt } = props;

  return (
    <article className={styles.container}>
      <section>
        <article className={styles.headerContainer}>
          <span className={styles.appIconContainer}>
            <Image
              src={SampleAppIcon}
              height="65"
              width="65"
              alt={`${title} app icon`}
            />
          </span>

          <span className={styles.titleContainer}>
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
          </span>
        </article>

        <article></article>
      </section>

      <section>
        <p className={styles.excerpt}>{excerpt}</p>
      </section>
    </article>
  );
};

export default FeatureSectionProjectPost;
