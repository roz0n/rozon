import styles from "../styles/Error/ServerError.module.css";
import Image from "next/image";
import ExplosionMemoji from "../public/images/memoji/explosion.png";

const NotFound = () => {
  return (
    <article className={styles.container}>
      <section className={styles.memojiContainer}>
        <Image
          src={ExplosionMemoji}
          alt="An image of my Memoji avatar"
          quality={100}
          height={120}
          width={120}
        />
      </section>

      <section>
        <h1 className={styles.header}>404</h1>
        <small className={styles.subheader}>
          Are you sure you&apos;re in the right place?
        </small>
      </section>
    </article>
  );
};

export default NotFound;
