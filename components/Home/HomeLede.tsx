import styles from "../../styles/Pages/Home/HomeLede.module.css";
import text from "../../text/Index.text";
import ContentLayout from "../Layouts/ContentLayout";

const HomeLede: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <ContentLayout direction="column">
        <p className={styles.header}>{text.homeLedeHeader["en"]}</p>
        <p className={styles.subheader}>{text.homeLedeSubheader["en"]}</p>
      </ContentLayout>
    </article>
  );
};

export default HomeLede;
