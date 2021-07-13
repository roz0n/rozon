import querystring from "querystring";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;
const endpoints = {
  token: "https://accounts.spotify.com/api/token",
  recents: `https://api.spotify.com/v1/me/player/recently-played`,
};

const getAccessToken = async () => {
  const request = await fetch(endpoints.token, {
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

  return await request.json();
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(endpoints.recents, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export { getAccessToken, getRecentlyPlayed };
