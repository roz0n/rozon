import querystring from "querystring";

const getAccessToken = async () => {
  const endpoint = `https://accounts.spotify.com/api/token`;
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  const request = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  const response = await request.json();
  return response;
};

const getRecentlyPlayed = async () => {
  const endpoint = `https://api.spotify.com/v1/me/player/recently-played`;
  const { access_token } = await getAccessToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default async (_, res) => {
  // TODO: Try catch and errors
  const request = await getRecentlyPlayed();
  const response = await request.json();
  console.log(response);
  return res.status(200).json(response);
};
