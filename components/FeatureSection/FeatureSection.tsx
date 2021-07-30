import { FeatureSectionProps } from "../..";
import styles from "../../styles/FeatureSection/FeatureSection.module.css";
import ContentLayout from "../Layouts/ContentLayout";

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  let { title } = props;

  return (
    <section className={styles.container}>
      <ContentLayout direction="column">
        <article className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </article>
        <article className={styles.contentContainer}>{props.children}</article>
      </ContentLayout>
    </section>
  );
};

export default FeatureSection;
