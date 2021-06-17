import styles from "../styles/Lede.module.css";
import text from "../text/Lede.text";

const Lede: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <p className={styles.header}>{text.header["en"]}</p>
      <p className={styles.subheader}>{text.subheader["en"]}</p>
    </article>
  );
};

export default Lede;
