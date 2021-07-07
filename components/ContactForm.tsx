import styles from "../styles/ContactForm/ContactForm.module.css";
import text from "../text/Index.text";
import { useState, useEffect, SyntheticEvent } from "react";
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
  const [emailText, setEmailText] = useState(String());
  const [inquiryTextCount, setInquiryTextCount] = useState(0);
  const [inquiryText, setInquiryText] = useState(String());

  const maxCharCount = 180;
  const isButtonSelected = (label: string) => label === selectedButton;
  const atMaxCharCount = (count: number) => count + 1 === maxCharCount + 2;
  const isButtonDisabled = () => {
    if (inquiryTextCount <= 0) {
      return true;
    }

    if (!selectedButton) {
      return true;
    }

    if (!handleEmailValidation(emailText)) {
      return true;
    }

    return false;
  };

  function handleButtonSelection(label: string) {
    if (!contactFormButtons.map((button) => button.label).includes(label)) {
      return;
    }

    setSelectedButton(label);
  }

  function handleEmailText(email: string) {
    setEmailText(email);
  }

  function handleEmailValidation(email: string) {
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
  }

  function handleInquiryTextArea(
    text: string,
    count: number,
    maxCount: number
  ) {
    if (!atMaxCharCount(count)) {
      console.log(maxCount, count);
      console.log("Hitting");
      setInquiryText(text);
      setInquiryTextCount(count);
    } else {
      return;
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    window.alert(`
      ${selectedButton} \n
      ${emailText} \n
      ${inquiryText} \n
    `);
  }

  useEffect(() => {
    console.log("FORM TEXT COUNT", inquiryTextCount);
    console.log("SELECTED BUTTON", selectedButton);
    console.log("isButtonDisabled", isButtonDisabled());
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
            onClick={handleButtonSelection}
            isSelected={isButtonSelected}
          />
        ))}
      </article>

      <article className={styles.formContainer}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <input
            className={styles.emailField}
            placeholder="Your email"
            value={emailText}
            type="email"
            onChange={(e) => {
              handleEmailText(e.target.value);
            }}
          />
          <textarea
            className={styles.inquiryField}
            placeholder="Enter a brief inquiry..."
            value={inquiryText}
            maxLength={maxCharCount}
            onChange={(e) =>
              handleInquiryTextArea(
                e.target.value,
                e.target.value.length,
                maxCharCount
              )
            }
          />
          <div className={styles.toolbar}>
            <button
              className={`${
                isButtonDisabled()
                  ? styles.submitButtonInactive
                  : styles.submitButtonActive
              }`}
              disabled={isButtonDisabled()}
            >
              {text.contactFormButton["en"]}
            </button>
            <article>
              <p
                className={styles.wordcount}
              >{`${inquiryTextCount}/${maxCharCount}`}</p>
            </article>
          </div>
        </form>
      </article>
    </section>
  );
};

export default ContactForm;
