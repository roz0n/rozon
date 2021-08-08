import styles from "../../styles/ContactForm/ContactForm.module.css";
import text from "../../text/Index.text";
import { ContactFormButtonItem } from "../..";
import Image from "next/image";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ContactFormLoader from "./ContactFormLoader";
import SmilingMemoji from "../../public/images/memoji/smiling-gold-tooth.png";
import ThinkingMemoji from "../../public/images/memoji/thinking.png";
import CelebrateMemoji from "../../public/images/memoji/celebrate.png";
import ExplosionMemoji from "../../public/images/memoji/explosion.png";
import ContactFormButton from "./ContactFormButton";

enum MemojiStates {
  Smile,
  Think,
  Celebrate,
  Explosion,
}

const contactFormButtons: ContactFormButtonItem[] = [
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [mailerError, setMailerError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [memojiState, setMemojiState] = useState<MemojiStates>(
    MemojiStates.Smile
  );
  const footerRef = useRef(null);

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

  function handleInquiryTextAreaChange(text: string, count: number) {
    if (!atMaxCharCount(count)) {
      setInquiryText(text);
      setInquiryTextCount(count);
    } else {
      return;
    }
  }

  async function sendInquiry(formattedEmail: string) {
    try {
      setIsLoading(true);
      const request = await fetch("/api/mailer/sendMail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailText,
          to: "arnold@rozon.org",
          subject: `(${selectedButton}) Rozon.org Website Inquiry`,
          text: formattedEmail,
        }),
      });
      const response = await request.json();

      if (!response.success) {
        throw new Error("Failed to send email :(");
      } else {
        setHasSubmitted(true);
        setMailerError(false); // just in case...
        setMemojiState(MemojiStates.Celebrate);
      }
    } catch (error) {
      setMailerError(true);
      setMemojiState(MemojiStates.Explosion);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const formattedEmailText = `
      <div>
        <h2>Subject:</h2>
        <p>${selectedButton}</p>
        <hr />
        <h2>Sender:</h2>
        <p>${emailText}</p>
        <hr />
        <h2>Inquiry:</h2>
        <p>${inquiryText}</p>
        <br />
        <br />
        <br />
        <small>IP Address of Sender:</small>
        <small>xxx</small>
      </div>
    `;

    await sendInquiry(formattedEmailText);
  }

  function handleReset() {
    setSelectedButton(null);
    setEmailText(String());
    setInquiryTextCount(0);
    setInquiryText(String());
    setHasSubmitted(false);
    setMemojiState(MemojiStates.Smile);
    setMailerError(false);

    const footer = document.querySelector("footer");
    footer.scrollIntoView({ behavior: "smooth" });
  }

  function getMemoji(state: MemojiStates) {
    switch (state) {
      case MemojiStates.Smile:
        return SmilingMemoji;
      case MemojiStates.Think:
        return ThinkingMemoji;
      case MemojiStates.Celebrate:
        return CelebrateMemoji;
      case MemojiStates.Explosion:
        return ExplosionMemoji;
      default:
        break;
    }
  }

  useEffect(() => {
    if (inquiryText || emailText) {
      setMemojiState(MemojiStates.Think);
    } else {
      setMemojiState(MemojiStates.Smile);
    }
  }, [inquiryText, emailText]);

  return (
    <article className={styles.container}>
      {!isLoading ? (
        <article className={styles.memojiContainer}>
          <Image
            src={getMemoji(memojiState)}
            alt="An image of my Memoji avatar"
            quality={100}
            height={120}
            width={120}
          />
        </article>
      ) : (
        <ContactFormLoader />
      )}
      {!hasSubmitted && !mailerError && !isLoading && (
        <>
          <article className={styles.headerContainer}>
            <h3 className={styles.header}>{text.contactFormHeader["en"]}</h3>
            <small className={styles.subheader}>
              Select the nature of your inquiry below. I&#39;ll do my best to
              respond promptly.
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

            <article className={styles.mobileMenuWrapper}>
              <span className={styles.mobileMenuIcon}>
                <ChevronDownIcon height={"1.5rem"} width={"1.5rem"} />
              </span>
              <select
                defaultValue=""
                className={styles.mobileMenu}
                onChange={(e) => handleButtonSelection(e.target.value)}
              >
                {contactFormButtons.map((button) => (
                  <option key={button.label} value={button.label}>
                    {button.label}
                  </option>
                ))}
                <option hidden value="" disabled>
                  Select an option
                </option>
              </select>
            </article>

            <section className={styles.formContainer}>
              <form
                className={styles.form}
                onSubmit={async (e) => await handleSubmit(e)}
              >
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
                      e.target.value.length
                    )
                  }
                />
                <article className={styles.toolbar}>
                  <span>
                    <p
                      className={styles.wordcount}
                    >{`${inquiryTextCount}/${maxCharCount}`}</p>
                  </span>

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
                </article>
              </form>
            </section>
          </article>
        </>
      )}

      {hasSubmitted && !mailerError && !isLoading && (
        <div className={styles.secondaryMessageContainer}>
          <article className={styles.headerContainer}>
            <h3 className={styles.header}>I&#39;ve received your inquiry!</h3>
            <small className={styles.subheader}>
              As promised, I&#39;ll get back to you promptly.
            </small>
          </article>
          <ContactFormButton label={"Close"} onClick={handleReset} />
        </div>
      )}

      {mailerError && !isLoading && (
        <div className={styles.secondaryMessageContainer}>
          <article className={styles.headerContainer}>
            <h3 className={styles.header}>
              Uh-oh. Something&#39;s gone wrong...
            </h3>
            <small className={styles.subheader}>
              A team of highly trained code monkeys has been dispatched to sort
              this out.
            </small>
          </article>
          <ContactFormButton label={"Close"} onClick={handleReset} />
        </div>
      )}
    </article>
  );
};

export default ContactForm;
