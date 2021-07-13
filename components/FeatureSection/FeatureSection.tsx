import { FeatureSectionProps } from "../..";
import styles from "../styles/FeatureSection/FeatureSection.module.css";

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  let { title } = props;

  return (
    <section className={styles.container}>
      <article className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </article>
      <article className={styles.contentContainer}>{props.children}</article>
    </section>
  );
};

export default FeatureSection;
