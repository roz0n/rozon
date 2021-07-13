import styles from "../../styles/Pages/Home/HomeLede.module.css";
import text from "../../text/Index.text";

const HomeLede: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <p className={styles.header}>{text.homeLedeHeader["en"]}</p>
      <p className={styles.subheader}>{text.homeLedeSubheader["en"]}</p>
    </article>
  );
};

export default HomeLede;
