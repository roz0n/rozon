import weatherIcons from "../resources/weather/weatherIcons";

const convertWeatherbitIcon = (icon: number) => {
  if (!icon) {
    return null;
  } else if (!weatherIcons[icon]) {
    return null;
  } else {
    return weatherIcons[icon];
  }
};

export default convertWeatherbitIcon;
