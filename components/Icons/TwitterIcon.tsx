import { IconProps } from "../..";

const TwitterIcon: React.FC<IconProps> = ({
  height,
  width,
  fillColor = "",
}) => {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.9811 12.1998C27.2614 12.1995 26.5507 12.3615 25.9001 12.6741C25.2496 12.9866 24.6755 13.4419 24.2193 14.0072C23.763 14.5724 23.4361 15.2335 23.262 15.9426C23.0879 16.6518 23.0711 17.3913 23.2126 18.1079C23.2613 18.3562 23.2514 18.6127 23.1835 18.8563C23.1156 19.0999 22.9918 19.3237 22.8221 19.5092C22.6525 19.6947 22.442 19.8367 22.2078 19.9235C21.9736 20.0103 21.7225 20.0394 21.475 20.0085C18.0877 19.5859 14.8945 18.1718 12.2847 15.9386C12.3335 16.9017 12.6627 17.9255 13.3763 18.9974L14.446 20.6036L12.6895 21.3635L12.3508 21.5107C12.6029 21.8035 12.9053 22.1026 13.244 22.3986C13.6968 22.7921 14.1758 23.1535 14.6776 23.48L14.6949 23.4912H14.6965L17.135 24.9935L14.583 26.2893C14.457 26.3533 14.331 26.4109 14.205 26.4621C14.7537 26.9251 15.3582 27.3154 16.004 27.6235L18.1937 28.6746L16.36 30.2808C15.3597 31.1575 14.353 31.8118 13.0471 32.1574C15.05 33.2408 17.2854 33.8052 19.5547 33.8004C27.1257 33.8004 33.2222 27.6651 33.2222 20.1477V19.3158L33.8917 18.8374C34.9377 18.0919 35.6765 17.084 36.2058 15.9306H32.8031L32.3746 15.0187C31.9801 14.1751 31.358 13.4624 30.5806 12.9635C29.8031 12.4645 28.9023 12.1997 27.9827 12.1998H27.9811ZM10.2115 23.8784C10.0629 24.0513 9.9526 24.2546 9.88818 24.4746C9.82376 24.6946 9.80671 24.9261 9.83819 25.1534C10.0162 26.4349 10.7708 27.5387 11.6057 28.3818C11.8325 28.6106 12.0751 28.8298 12.3303 29.0393L12.2122 29.0713C11.4545 29.2633 10.4321 29.3033 8.72917 29.1353C8.40758 29.1033 8.08407 29.1724 7.8025 29.3334C7.52092 29.4944 7.29491 29.7394 7.15509 30.0353C7.01528 30.3311 6.96844 30.6635 7.02091 30.9873C7.07339 31.3111 7.22264 31.6107 7.44844 31.8454C9.02497 33.4819 10.9083 34.7811 12.9873 35.6664C15.0663 36.5517 17.2988 37.0051 19.5532 37C28.5529 37 35.9349 29.9032 36.3523 20.9476C38.3845 19.215 39.4005 16.8681 39.9488 14.7355C40.0097 14.4988 40.0164 14.2511 39.9683 14.0114C39.9202 13.7717 39.8186 13.5463 39.6713 13.3527C39.524 13.1591 39.335 13.0024 39.1187 12.8946C38.9025 12.7868 38.6648 12.7309 38.4238 12.731H34.7171C33.8104 11.3013 32.4855 10.196 30.9283 9.57047C29.3712 8.94494 27.6602 8.83059 26.0358 9.24349C24.4114 9.65639 22.9552 10.5758 21.8718 11.8725C20.7885 13.1692 20.1324 14.778 19.9958 16.4729C17.092 15.7053 14.4938 14.0425 12.5588 11.7135C12.3874 11.5077 12.1676 11.3493 11.9198 11.2528C11.6721 11.1564 11.4043 11.125 11.1414 11.1617C10.8785 11.1984 10.629 11.302 10.4161 11.4628C10.2031 11.6236 10.0336 11.8364 9.92326 12.0815C8.96861 14.1964 8.78588 16.6345 9.85079 19.1142L9.48217 19.2742C9.12941 19.4268 8.84359 19.7049 8.67829 20.0562C8.51298 20.4076 8.47954 20.8081 8.58424 21.1827C8.87725 22.2258 9.53573 23.1473 10.21 23.8784H10.2115Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default TwitterIcon;