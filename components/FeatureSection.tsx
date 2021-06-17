import { FeatureSectionProps } from "..";
import styles from "../styles/FeatureSection.module.css";

const FeatureSection: React.FC<FeatureSectionProps> = (props) => {
  let { title } = props;

  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      {props.children}
    </section>
  );
};

export default FeatureSection;
