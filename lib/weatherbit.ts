const endpoints = {
  current: (postalCode, apiKey) =>
    `https://api.weatherbit.io/v2.0/current?units=I&postal_code=${postalCode}&key=${apiKey}&include=minutely`,
};

const currentWeatherData = () => {
  const { WEATHERBIT_POSTAL_CODE, WEATHERBIT_API_KEY } = process.env;
  return fetch(endpoints.current(WEATHERBIT_POSTAL_CODE, WEATHERBIT_API_KEY));
};

export { currentWeatherData };
