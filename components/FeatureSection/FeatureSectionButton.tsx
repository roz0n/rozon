import { FeatureSectionButtonProps } from "../..";
import styles from "../../styles/FeatureSection/FeatureSectionButton.module.css";

const FeatureSectionButton: React.FC<FeatureSectionButtonProps> = ({
  label,
  children,
}) => {
  return (
    <button className={styles.button}>
      <span className={styles.childrenContainer}>{children}</span>
      {label}
    </button>
  );
};

export default FeatureSectionButton;
