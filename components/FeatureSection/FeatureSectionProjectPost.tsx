import styles from "../../styles/FeatureSection/FeatureSectionProjectPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { FeatureSectionProjectPostProps } from "../..";
import {
  PROJECT_ICONS,
  formatProjectUrl,
  restrictedTags,
} from "../../utils/ghostUtils";

const FeatureSectionProjectPost: React.FC<FeatureSectionProjectPostProps> = ({
  slug,
  title,
  excerpt,
  image,
  html,
  tags,
}) => {
  return (
    <Link href={formatProjectUrl(html)}>
      <a>
        <article className={styles.container}>
          <section className={styles.headerSectionContainer}>
            <article className={styles.headerContainer}>
              <article className={styles.appIconContainer}>
                <Image
                  src={PROJECT_ICONS[slug] || image}
                  height="65"
                  width="65"
                  alt={`${title} app icon`}
                  quality={100}
                  unoptimized={false}
                  priority={true}
                />
              </article>
              <article className={styles.titleContainer}>
                <h3 className={styles.title}>{title}</h3>
                <ul className={styles.tagList}>
                  {tags?.map(
                    (tag) =>
                      !restrictedTags.includes(tag.name) && (
                        <li key={tag.name} className={styles.tagChip}>
                          {tag.name}
                        </li>
                      )
                  )}
                </ul>
              </article>
            </article>
          </section>
          <section>
            <p className={styles.excerpt}>{excerpt}</p>
          </section>
        </article>
      </a>
    </Link>
  );
};

export default FeatureSectionProjectPost;
