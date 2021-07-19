import styles from "../styles/Error/ServerError.module.css";
import Image from "next/image";
import SweatingMemoji from "../public/images/memoji/sweating.png";

const InternalServerError = () => {
  return (
    <article className={styles.container}>
      <section className={styles.memojiContainer}>
        <Image
          src={SweatingMemoji}
          alt="An image of my Memoji avatar"
          quality={100}
          height={120}
          width={120}
        />
      </section>

      <section>
        <h1 className={styles.header}>500</h1>
        <small className={styles.subheader}>
          Woops. That wasn't supposed to happen.
        </small>
      </section>
    </article>
  );
};

export default InternalServerError;
