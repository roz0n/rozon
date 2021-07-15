import styles from "../../styles/Widgets/WeatherbitWidget.module.css";
import { WeatherbitWidgetProps } from "../..";
import convertWeatherbitIcon from "../../utils/convertWeatherbitIcon";

const WeatherbitWidget: React.FC<WeatherbitWidgetProps> = ({ data, error }) => {
  return data?.length && !error ? (
    <article className={styles.container}>
      <header className={styles.headerContainer}>
        <p className={styles.title}>Latest Feels</p>
      </header>

      <section className={styles.tempContainer}>
        <div className={styles.tempWrapper}>
          <i className={`wi ${convertWeatherbitIcon(data[0].weather.code)}`} />
          <p>&nbsp;{Math.round(+data[0].temp)}&deg;</p>
        </div>
        <div className={styles.cityContainer}>
          <p>
            in {data[0].city_name}, {data[0].state_code}
          </p>
        </div>
      </section>
    </article>
  ) : (
    <div></div>
  );
};

export default WeatherbitWidget;
