import styles from "../styles/ContactForm/ContactFormButton.module.css";
import { ContactFormButtonProps } from "..";

const ContactFormButton: React.FC<ContactFormButtonProps> = (props) => {
  const { label } = props;
  return <button className={styles.button}>{label}</button>;
};

export default ContactFormButton;
