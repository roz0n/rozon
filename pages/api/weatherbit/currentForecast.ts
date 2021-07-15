import { currentWeatherData } from "../../../lib/weatherbit";

const currentForecast = async (_, res) => {
  try {
    // TODO: Try catch and errors
    const request = await currentWeatherData();
    const response = await request.json();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export default currentForecast;
