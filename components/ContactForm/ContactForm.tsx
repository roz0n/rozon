import styles from "../../styles/ContactForm/ContactForm.module.css";
import text from "../../text/Index.text";
import { useState, useEffect, SyntheticEvent } from "react";
import { ContactFormButtonItem } from "../..";
import Image from "next/image";
import SmilingMemoji from "../../public/images/memoji/smiling-gold-tooth.png";
import ThinkingMemoji from "../../public/images/memoji/thinking.png";
import CelebrateMemoji from "../../public/images/memoji/celebrate.png";

import ContactFormButton from "./ContactFormButton";

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

enum MemojiStates {
  Smile,
  Think,
  Celebrate,
}

const ContactForm: React.FC = (props) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [emailText, setEmailText] = useState(String());
  const [inquiryTextCount, setInquiryTextCount] = useState(0);
  const [inquiryText, setInquiryText] = useState(String());
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [memojiState, setMemojiState] = useState<MemojiStates>(
    MemojiStates.Smile
  );

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

  // Form
  const EMAIL = "email";
  const INQUIRY = "inquiry";

  // Helpers
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

  function handleInquiryTextAreaChange(
    text: string,
    count: number,
    maxCount: number
  ) {
    if (!atMaxCharCount(count)) {
      // console.log(maxCount, count);
      // console.log("Hitting");
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

    setHasSubmitted(true);
    setMemojiState(MemojiStates.Celebrate);
  }

  function handleReset() {
    setSelectedButton(null);
    setEmailText(String());
    setInquiryTextCount(0);
    setInquiryText(String());
    setHasSubmitted(false);
    setMemojiState(MemojiStates.Smile);
  }

  function getMemoji(state: MemojiStates) {
    switch (state) {
      case MemojiStates.Smile:
        return SmilingMemoji;
      case MemojiStates.Think:
        return ThinkingMemoji;
      case MemojiStates.Celebrate:
        return CelebrateMemoji;
      default:
        break;
    }
  }

  useEffect(() => {
    // console.log("FORM TEXT COUNT", inquiryTextCount);
    // console.log("SELECTED BUTTON", selectedButton);
    // console.log("isButtonDisabled", isButtonDisabled());
    if (inquiryText || emailText) {
      setMemojiState(MemojiStates.Think);
    } else {
      setMemojiState(MemojiStates.Smile);
    }
  }, [inquiryText, emailText]);

  return (
    <article className={styles.container}>
      <article className={styles.memojiContainer}>
        <Image
          src={getMemoji(memojiState)}
          alt="An image of my Memoji avatar"
          quality={100}
          height={120}
          width={120}
        />
      </article>

      {!hasSubmitted ? (
        <>
          <article className={styles.headerContainer}>
            <h3 className={styles.header}>{text.contactFormHeader["en"]}</h3>
            <small className={styles.subheader}>
              Select a topic and I&#39;ll get back to you soon <i>(-ish)</i>.
            </small>
          </article>

          <article className={styles.formWrapper}>
            <section className={styles.buttonsContainer}>
              {contactFormButtons.map((button) => (
                <ContactFormButton
                  key={button.label}
                  label={button.label}
                  onClick={handleButtonSelection}
                  isSelected={isButtonSelected}
                />
              ))}
            </section>

            <section className={styles.formContainer}>
              <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <input
                  name={EMAIL}
                  className={styles.emailField}
                  placeholder="Your email"
                  value={emailText}
                  autoComplete={"false"}
                  onChange={(e) => {
                    handleEmailText(e.target.value);
                  }}
                />
                <textarea
                  name={INQUIRY}
                  className={styles.inquiryField}
                  placeholder="A brief inquiry"
                  value={inquiryText}
                  maxLength={maxCharCount}
                  onChange={(e) =>
                    handleInquiryTextAreaChange(
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
                  <span>
                    <p
                      className={styles.wordcount}
                    >{`${inquiryTextCount}/${maxCharCount}`}</p>
                  </span>
                </div>
              </form>
            </section>
          </article>
        </>
      ) : (
        <>
          <article className={styles.headerContainer}>
            <h3 className={styles.header}>I've received your inquiry!</h3>
            <small className={styles.subheader}>
              As promised, I&#39;ll get back to you soon <i>(-ish)</i>.
            </small>
          </article>
          <ContactFormButton label={"Close"} onClick={handleReset} />
        </>
      )}
    </article>
  );
};

export default ContactForm;
