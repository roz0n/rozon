// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const helloRoute = (req, res) => {
  res.statusCode = 200;
  res.json({ name: "Arnaldo Rozon" });
};

export default helloRoute;
