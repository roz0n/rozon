import styles from "../../styles/Layouts/FooterContentLayout.module.css";

const FooterContentLayout: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default FooterContentLayout;
