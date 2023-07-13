# HTML templating

## Creating Template

We'll build an template which will hold actual data for our application. Our template file will contain data from the data.json file.

This how we build our template.

```html
<p>{%PARAGRAPH%}</p>
```

The `{%PARAGRAPH%}` will be replaced by the actual text that is held by the `PARAGRAPH` Placeholder.

In our overview.html we have many products and let's suppose we don't know how many products are there in the data.json file. we create a template (template-card.html) for one product then we will include (in overview.html) this template for every product.

## Filling Template

Now we need to replace the placeholders with the actual content.

In our server.js we need to replace the placeholders with the actual content before sending the response to the browser. This is how we do that -

```js
//replace the placeholders
//replaceTemplate function is responsible for swapping placeholders with actual content.
const cardsHtml = dataObj.map((el) => replaceTemplate(templateCard, el));
```

`replaceTemplate` Function

```js
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
```

Now we're done with the overview page. Now we need to implement the product details page. For this we need to parse some variables from the URL.

we need to import the `url` module into our script. we need to add the following block of code to our if-else if block.

```js
else if (pathName.includes("/product")) {
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
  }

```

We could also use the `pathName` that is returned by the parse method to check for the right url.
