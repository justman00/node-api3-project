// require your server and launch it
const server = require("./api/server");

const port = process.env.PORT || 4000;

server.get("/favicon.ico", (req, res) => res.status(204));

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

/**/
