import { currentWeatherData } from "../../../lib/weatherbit";

const currentForecast = async (_, res) => {
  // TODO: Try catch and errors
  const request = await currentWeatherData();
  const response = await request.json();
  console.log("Weatherbit response:", response);
  return res.send(response);
};

export default currentForecast;
