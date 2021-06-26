import styles from "../styles/Layout.module.css";

const Layout: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Layout;
