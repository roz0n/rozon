import styles from "../../styles/Widgets/WeatherbitWidget.module.css";
import { WeatherbitWidgetProps } from "../..";
import convertWeatherbitIcon from "../../utils/convertWeatherbitIcon";

const WeatherbitWidget: React.FC<WeatherbitWidgetProps> = ({ data, error }) => {
  return data?.length && !error ? (
    <article className={styles.container}>
      <header className={styles.headerContainer}>
        {/* <p className={styles.title}>Latest Feels</p> */}
      </header>

      <section className={styles.tempContainer}>
        <article className={styles.tempWrapper}>
          <span className={styles.tempIconContainer}>
            <i
              className={`wi ${convertWeatherbitIcon(data[0].weather.code)}`}
            />
          </span>
          <p>&nbsp;{Math.round(+data[0].temp)}&deg;</p>
        </article>

        <article className={styles.cityContainer}>
          <p>
            in {data[0].city_name}, {data[0].state_code}
          </p>
        </article>
      </section>
    </article>
  ) : (
    <div></div>
  );
};

export default WeatherbitWidget;
