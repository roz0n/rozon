import styles from "../../styles/WeatherbitWidget.module.css";
import convertWeatherbitIcon from "../../utils/convertWeatherbitIcon";
import { WeatherDataObject } from "../..";

type WeatherbitWidgetProps = {
  data?: WeatherDataObject[];
  error?: boolean;
};

const WeatherbitWidget: React.FC<WeatherbitWidgetProps> = ({ data, error }) => {
  return data?.length && !error ? (
    <article className={styles.container}>
      <p className={styles.title}>Latest Feels</p>
      <span>
        <div className={styles.tempContainer}>
          <i className={`wi ${convertWeatherbitIcon(data[0].weather.code)}`} />
          <p>&nbsp;{Math.round(+data[0].temp)}&deg;</p>
        </div>
        <div className={styles.cityContainer}>
          <p>
            in {data[0].city_name}, {data[0].state_code}
          </p>
        </div>
      </span>
    </article>
  ) : (
    <div></div>
  );
};

export default WeatherbitWidget;
