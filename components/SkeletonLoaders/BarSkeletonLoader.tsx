import styles from "../../styles/SkeletonLoaders/BarSkeletonLoader.module.css";
import skeleton from "../../styles/SkeletonLoaders/SkeletonLoaders.module.css";

type BarSkeletonLoaderProps = {
  height: string;
  width: string;
  backgroundColor?: string;
};

const BarSkeletonLoader: React.FC<BarSkeletonLoaderProps> = ({
  height,
  width,
  backgroundColor,
}) => {
  return (
    <article
      className={`${skeleton.shimmer} ${styles.container}`}
      style={{ height, width }}
    ></article>
  );
};

export default BarSkeletonLoader;
