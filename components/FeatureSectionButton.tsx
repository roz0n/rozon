import { FeatureSectionButtonProps } from "../";
import styles from "../styles/FeatureSection/FeatureSectionButton.module.css";

const FeatureSectionButton: React.FC<FeatureSectionButtonProps> = ({
  label = "View all",
}) => {
  return <button className={styles.button}>{label}&nbsp;&nbsp;&#8594;</button>;
};

export default FeatureSectionButton;
