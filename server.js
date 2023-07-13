const fs = require("fs");
const http = require("http");
const url = require("url");

// Read file synchronously at server startup
const data = fs.readFileSync(`${__dirname}/data.json`, { encoding: "utf-8" });
const dataObj = JSON.parse(data);

//replaceTemplate Function
const replaceTemplate = (template, product) => {
  //new variable is created because it's not a good idea to mutate orignal varaible
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);

  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(
    /{%NOT_ORGANIC%}/g,
    product.organic ? "" : "not-organic"
  );

  return output;
};

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  { encoding: "utf-8" }
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  { encoding: "utf-8" }
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  { encoding: "utf-8" }
);

//1. Create a server
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // For overview page
  if (pathName === "/" || pathName === "/overview") {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-type", "text/html");

    //replace the placeholders
    //replace template function is responsible for swapping placeholders with actual content.
    const cardsHtml = dataObj.map((el) => replaceTemplate(templateCard, el));

    res.end(templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml.join("")));
  } else if (pathName === "/api") {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-type", "application/json");
    res.end(data);
  } else if (pathName.includes("/product")) {
    const {
      query: { id },
    } = url.parse(pathName, true);

    const product = dataObj[parseInt(id)];

    //send heders first
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-type", "text/html");

    const productPage = replaceTemplate(templateProduct, product);
    res.end(productPage);
  } else {
    res.statusCode = 404;
    res.statusMessage = "Not Found";
    res.end("Page Not Found");
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log(`server listening on ${server.address().port}`);
});
