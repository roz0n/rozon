import { FeatureSectionProps } from "..";
import styles from "../styles/FeatureSection.module.css";

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  let { title } = props;

  return (
    <section className={styles.container}>
      <article className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </article>
      {props.children}
    </section>
  );
};

export default FeatureSection;
