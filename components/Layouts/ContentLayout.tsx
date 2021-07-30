import { ContentLayoutProps } from "../..";
import styles from "../../styles/Layouts/ContentLayout.module.css";

const ContentLayout: React.FC<ContentLayoutProps> = ({
  direction = "row",
  children,
}) => {
  return (
    <div className={styles.container} style={{ flexDirection: direction }}>
      {children}
    </div>
  );
};

export default ContentLayout;
