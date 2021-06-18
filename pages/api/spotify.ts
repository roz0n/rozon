// TODO: Handle errors

const getRecentlyPlayed = async (req, res) => {
    // try {
    //   const endpoint = `https://api.weatherbit.io/v2.0/current?units=I&postal_code=${process.env.WEATHERBIT_POSTAL_CODE}&key=${process.env.WEATHERBIT_API_KEY}&include=minutely`;
    //   const response = await fetch(endpoint).then((res) => res.json());
  
    //   res.statusCode = 200;
    //   res.json({ data: response.data });
    // } catch (error) {
    //   res.statusCode = 500;
    //   res.json({ success: false, error: "Unable to fetch Weatherbit data" });
    // }
  };
  
  export default getRecentlyPlayed;
  