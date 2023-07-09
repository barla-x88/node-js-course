const http = require("node:http");
const url = require("node:url");
const fs = require("fs");

const mime = require("mime");

const server = http.createServer((req, res) => {
  const returnPage = (url) => {
    filePath = url === "/" ? "./pages/index.html" : `./pages${url}`;
    const html = fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.statusMessage = "Not Found";
        res.end("Resource Not Found!");
        return;
      }
      res.statusCode = 200;
      res.statusMessage = "OK";
      res.setHeader("Content-Type", mime.getType(filePath));
      res.end(data);
      return;
    });
  };
  returnPage(req.url);
});

server.listen(8080, "127.0.0.1", () => {
  console.log(
    "Server listening on " +
      server.address().address +
      " Port " +
      server.address().port
  );
});

server.on("request", (req, res) => {
  console.log(req.method, " ", req.url);
});
