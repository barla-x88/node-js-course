# Using Modules

We can create our modules where we can export some functionality and use it in another script by simply importing the function in the script. In nodeJs every single file is treated as a module.

https://nodejs.org/api/modules.html

```js
//exporting something
exports.helloWorld = () => {
  console.log("Hello World.");
};

//importing
const { helloWorld } = require("./modules/helloWorld");

helloWorld();
```

**OR**

```js
//exporting something (Anonymous function here)
module.exports = () => {
  console.log("Hello World.");
};

//importing
//we can name it anything
const someFunctionName = require("./modules/helloWorld");

someFunctionName();
```
