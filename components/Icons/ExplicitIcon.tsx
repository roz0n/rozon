import { IconProps } from "../..";

const ExplicitIcon: React.FC<IconProps> = ({
  height,
  width,
  fillColor = "",
}) => {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0C1.79102 0 0 1.79102 0 4V12C0 14.209 1.79102 16 4 16H12C14.209 16 16 14.209 16 12V4C16 1.79102 14.209 0 12 0H4ZM10.9297 12H5.13477V3.54492H10.9297V5.27344H7.28516V6.94336H10.7129V8.56055H7.28516V10.2715H10.9297V12Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default ExplicitIcon;
