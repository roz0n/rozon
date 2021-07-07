import styles from "../styles/ContactForm/ContactForm.module.css";
import text from "../text/Index.text";
import { useState, useEffect } from "react";
import { ContactFormButtonItem } from "..";
import Image from "next/image";
import Memoji from "../public/images/index/memoji-2021.svg";
import ContactFormButton from "../components/ContactFormButton";

let contactFormButtons: ContactFormButtonItem[] = [
  {
    label: "Consulting",
  },
  {
    label: "Development",
  },
  {
    label: "Design",
  },
  {
    label: "Banter",
  },
  {
    label: "Other",
  },
];

const ContactForm: React.FC = (props) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const isSelected = (label: string) => label === selectedButton;

  function handleSelectButton(label: string) {
    if (!contactFormButtons.map((button) => button.label).includes(label)) {
      return;
    }

    setSelectedButton(label);
  }

  useEffect(() => {
    console.log("Selected:", selectedButton);
  });

  return (
    <section className={styles.container}>
      <Image
        src={Memoji}
        alt="An image of my Memoji avatar"
        quality={100}
        height={100}
        width={100}
      />
      <h3 className={styles.header}>{text.contactFormHeader["en"]}</h3>

      <article>
        {contactFormButtons.map((button) => (
          <ContactFormButton
            key={button.label}
            label={button.label}
            onClick={handleSelectButton}
            isSelected={isSelected}
          />
        ))}
      </article>

      <article className={styles.formContainer}>
        <form className={styles.form}>
          <input className={styles.emailField} placeholder="Your email" />
          <textarea
            className={styles.inquiryField}
            placeholder="Enter a brief inquiry..."
          />
          <div className={styles.toolbar}>
            <button className={styles.submitButton}>
              {text.contactFormButton["en"]}
            </button>
            <article>
              <p className={styles.wordcount}>0/180</p>
            </article>
          </div>
        </form>
      </article>
    </section>
  );
};

export default ContactForm;
