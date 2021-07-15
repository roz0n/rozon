import { getRecentlyPlayed } from "../../../lib/spotify";

const recentlyPlayedTracks = async (_, res) => {
  try {
    const request = await getRecentlyPlayed();
    const response = await request.json();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export default recentlyPlayedTracks;
