import { getRecentlyPlayed } from "../../../lib/spotify";

const recentlyPlayedTracks = async (_, res) => {
  try {
    const request = await getRecentlyPlayed();
    const response = await request.json();

    if (response.error) {
      throw new Error(response.error);
    } else {
      return res.status(200).json({ success: true, data: response.items });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default recentlyPlayedTracks;
