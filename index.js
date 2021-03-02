// require your server and launch it
const server = require("./api/server");

const port = process.env.REACT_APP_PORT ||  4000;
console.log(process.env.REACT_APP_STEP_IT)
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
