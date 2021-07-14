import { getRecentlyPlayed } from "../../../lib/spotify";

const recentlyPlayedTracks = async (_, res) => {
  // TODO: Try catch and errors
  const request = await getRecentlyPlayed();
  const response = await request.json();
  // console.log("Spotify response:", response);
  return res.status(200).json(response);
};

export default recentlyPlayedTracks;
