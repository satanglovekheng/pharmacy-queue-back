const http = require("http");
const app = require("./app");
const initSocket = require("./socket/socket");

const server = http.createServer(app);

// init socket
initSocket(server);

server.listen(4001, () => {
  console.log("Backend running on http://localhost:4001");
});
