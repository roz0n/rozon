import styles from "../styles/ContactForm.module.css";

const ContactForm: React.FC = (props) => {
  return (
    <section className={styles.container}>
      <h3>What's the word?</h3>
      <article>Buttons</article>
      <form>
        <textarea></textarea>
        <button>Send</button>
      </form>
    </section>
  );
};

export default ContactForm;
