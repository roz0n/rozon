import styles from "../styles/Footer.module.css";

const Footer: React.FC = (props) => {
  return (
    <footer className={styles.container}>
      <article>
        Music
      </article>
      <span>&copy; 2021</span>
      <article>
        Weather
      </article>
    </footer>
  );
};

export default Footer;
