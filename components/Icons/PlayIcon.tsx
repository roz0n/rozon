import { IconProps } from "../..";

const PlayIcon: React.FC<IconProps> = ({ height, width, fillColor = "" }) => {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8242 28.1836C20.0938 28.1836 20.3398 28.0957 20.668 27.9082L27.6992 23.8301C28.2383 23.5195 28.5078 23.2324 28.5078 22.7754C28.5078 22.3242 28.2383 22.0371 27.6992 21.7207L20.668 17.6426C20.3398 17.4551 20.0938 17.373 19.8242 17.373C19.2734 17.373 18.8281 17.7891 18.8281 18.4922V27.0586C18.8281 27.7617 19.2734 28.1836 19.8242 28.1836Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default PlayIcon;
