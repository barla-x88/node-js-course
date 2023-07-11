const fs = require("fs");
const http = require("http");

// ---------------------------------------V1-----------------------------------------
// //1. Create a server
// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/api") {
//     //read data from file and send it back to the client
//     // __dirname points to the directory where currently executing script is located.
//     fs.readFile(`${__dirname}/data.json`, (err, data) => {
//       if (!err) {
//         res.statusCode = 200;
//         res.statusMessage = "OK";
//         res.setHeader("Content-type", "application/json");
//         res.end(data);
//       }
//     });
//   } else {
//     res.statusCode = 404;
//     res.statusMessage = "Not Found";
//     res.end("Page Not Found");
//   }
// });

// server.listen(8080, "127.0.0.1", () => {
//   console.log(`server listening on ${server.address().port}`);
// });

//----------------------------------------V2-----------------------------------------
// Read file synchronously at server startup
const data = fs.readFileSync(`${__dirname}/data.json`, { encoding: "utf-8" });

//1. Create a server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/api") {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-type", "application/json");
    res.end(data);
  } else {
    res.statusCode = 404;
    res.statusMessage = "Not Found";
    res.end("Page Not Found");
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log(`server listening on ${server.address().port}`);
});
