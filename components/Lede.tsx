import styles from "../styles/Lede.module.css";
import text from "../text/Index.text";

const Lede: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <p className={styles.header}>{text.ledeHeader["en"]}</p>
      <p className={styles.subheader}>{text.ledeSubheader["en"]}</p>
    </article>
  );
};

export default Lede;
