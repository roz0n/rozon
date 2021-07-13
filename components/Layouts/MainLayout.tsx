import styles from "../../styles/MainLayout.module.css";

const MainLayout: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default MainLayout;
