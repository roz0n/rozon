import styles from "../styles/Header.module.css";

const Header: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>Header</header>
      <nav className={styles.navigation}>yyy</nav>
    </article>
  );
};

export default Header;
