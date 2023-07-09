const http = require("node:http");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log(
    "Server listening on " +
      server.address().address +
      " Port - : " +
      server.address().port
  );
});
