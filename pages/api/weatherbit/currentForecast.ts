import { currentWeatherData } from "../../../lib/weatherbit";

const currentForecast = async (_, res) => {
  try {
    const request = await currentWeatherData();
    const response = await request.json();

    if (response.error) {
      throw new Error(response.error);
    } else {
      return res.status(200).json({ success: true, data: response.data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default currentForecast;
