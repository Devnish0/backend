const http = require("http");
console.log("Starting server script...");

const server = http.createServer((req, res) => {
  res.end("this msg is from server");
});
server.listen(9000);
//? use ctrl+\ to exit the server
