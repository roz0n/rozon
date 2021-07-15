import styles from "../../styles/FeatureSection/FeatureSectionEmptyState.module.css";
import { FeatureSectionEmptyStateProps } from "../../";

const FeatureSectionEmptyState: React.FC<FeatureSectionEmptyStateProps> = (
  props
) => {
  return (
    <article className={styles.container}>
      <div className={styles.iconContainer}>{props.children}</div>
      <small>{props.label}</small>
    </article>
  );
};

export default FeatureSectionEmptyState;
