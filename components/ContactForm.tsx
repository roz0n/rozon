import styles from "../styles/ContactForm.module.css";
import text from "../text/Index.text";

const ContactForm: React.FC = (props) => {
  return (
    <section className={styles.container}>
      <h3>{text.contactFormHeader}</h3>
      <article>xxx</article>
      <form>
        <textarea></textarea>
        <button>{text.contactFormButton}</button>
      </form>
    </section>
  );
};

export default ContactForm;
