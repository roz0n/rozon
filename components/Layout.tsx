import styles from "../styles/Layout.module.scss";

const Layout: React.FC = (props) => {
  return (
    <div className={styles.container}>
        {props.children}
    </div>
  );
}

export default Layout;