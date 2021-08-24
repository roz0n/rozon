import styles from "../../styles/Cards/BlogPostCard.module.css";
import Image from "next/image";

const BlogPostCard = ({ title, description, image }) => {
  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={image} width={300} height={157.5} />
      </div>

      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default BlogPostCard;
