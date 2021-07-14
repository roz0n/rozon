import styles from "../../styles/ContactForm/ContactFormButton.module.css";
import { ContactFormButtonProps } from "../..";

const ContactFormButton: React.FC<ContactFormButtonProps> = (props) => {
  const { label, onClick, isSelected } = props;

  return (
    <button
      className={`${styles.button} ${
        isSelected && isSelected(label) && styles.selectedButton
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default ContactFormButton;
