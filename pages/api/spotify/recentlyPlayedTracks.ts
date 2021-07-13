import { getRecentlyPlayed } from "../../../lib/spotify";

export default async (_, res) => {
  // TODO: Try catch and errors
  const request = await getRecentlyPlayed();
  const response = await request.json();
  console.log(response);
  return res.status(200).json(response);
};
