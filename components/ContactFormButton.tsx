import styles from "../styles/ContactFormButton.module.css";
import { ContactFormButtonProps } from "..";

const ContactFormButton: React.FC<ContactFormButtonProps> = (props) => {
  const { label } = props;
  return <button className={styles.button}>{label}</button>;
};

export default ContactFormButton;
