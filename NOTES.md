# Buliding API with express

## what is express

express is a minimal node js framework build on top of node js which provides high level of abstraction. Express contains a very robust set of features like complex routing, easier handling of requests and responses, adding middlewares, server-side rendering etc.

Express allows for rapid development of node js applications, It also makes it easier to organize our application into the MVC architecture.

## postman

[Postman](https://www.postman.com/) is a software for testing API which also aids in development of APIs.
It's kind of browser where we can enter an URL an make an request.

[Linux Installation](https://learning.postman.com/docs/getting-started/installation-and-updates/#installing-postman-on-linux)

## Installing express

Let's install express, create a simple server and do some basic routing.

```bash
npm i express
```

Create a new file called app.js where we save configuration for entire app. It's a convention to save all application configuration in a 'app.js' file.

In app.js

```js
const express = require('express');

const app = express();

//port on which the server will listen
const port = 3000;

//define routes using get method

//response will be sent if server receives a get request
app.get('/', (req, res) => {
  //also send a response status
  res.status(200).send('Hello from the express app.');
});

//easily send a json
app.get('/getJson', (req, res) => {
  //json method takse an object
  //automatically sets content-type: application/json
  res.status(200).json({ projectName: 'Natours', version: '1.4' });
});

//handle post request with post method
app.post('/', (req, res) => {
  res.status(200).send('Data saved.');
});

//start server
app.listen(3000, () => {
  console.log(`App running on port ${port}.`);
});
```

## APIs and Restful API design

API: A piece of software that can be used by another piece of software, in order to allows applications to talk to each other.

REST stands for **representational state transfer**. It's a way of building web APIs in a logical way to make them easy to consume. To build REST APIs we need to follow some principles -

- Separate API into logical resources
- expose resources using structured, resource-based URLs
- use HTTP methods (verbs) - To perform different action on data like read, create, delete, the API should use right HTTP method
- Send data as JSON - Send or receive JSON data format
- API must be stateless

Let's look into details about all these principles-

Let's start with resources. In our example API, The key abstraction of information in REST is a resource. Therefore all the data that we want to send in the API should be divided into logical resources. In context of REST, a resource is an object or representation of something which has some data associated with it. For example tours for users, or reviews, basically any information that can be named is a resource. It has to be a name not a "Verb".

![Resource](img/resource.png)

We need to expose (make available) the data using some structured URLs that the client can send request to. For example -

![url](img/url.png)

/getTour

/updateTour

/deleteTour

/getToursByUser

APIs have many endpoints like the above fictional endpoints, each of which will send different data to the client & also perform different actions. Note that there is something very wrong with these endpoints here, because they don't follow the third rule which says the we should only use HTTP methods in order to perform actions on data. Endpoints should only contain the "resources" and not the actions that can be performed on them because it will become very hard to maintain.

let's see how these endpoints should actually look like -

/getTour - This endpoint is for getting data about the tour and so we should simply name this endpoint "tours" and send the data when a GET request is made to this endpoint. Now we have only the resource in the endpoint and no verb, because the verb is now in HTTP Method. It's a convention to use plurals in endpoint names. The convention is that calling this endpoint we get back all the tours that are in database. If we only want a tour with one id we add that id after slash (/) or in a search query or it could also be the name of the tour or some other unique identifier.

![endpoint](img/endpoint.png)

The first HTTP method or verb that we can respond to is GET. It's used to perform read operation on data.

![endpoints](img/endpoints.png)

If a client want to create a resource in database the POST method should be used. we already know that a POST request can be used to send data to the server. In this case no id will be sent because the id will be figured out by the server.

To update existing resources either a PUT or PATCH request should be made to the endpoint. The difference between these two is that with PUT client is supposed to send entire updated object while with PATCH it is supposed to send only the part of the object that has been changed.

To delete a resource we use DELETE method. The unique identifier of the resource that need to be deleted should be part of the URL.

To perform these kinds of action the client needs to be authenticated, We'll take a look at how we can do this later in the course.

Beside these can be actions that are not CRUD like login or search operation. In that case we need be a little creative with our endpoints. We can use a endpoint name like /login. We'll talk about these cases later.

This is how we use HTTP methods to build user friendly and nicely structured URLs. They are easy and logical to consume for the client.

Now About the data that the client usually receives or the server receives from the client, we usually use the JSON data format. JSON is very lightweight data interchange format that is heavily use in REST APIs coded in any language. It is so widely used because its easy to understand and write JSON for both humans and computers.

![json](img/json.png)

Before sending the JSON we usually do some response formatting before sending. There are some standards for it and we'll use a very simple one called **Jsend**. So we simply create an object and add some status messages in it to inform the client whether the request was successful or not then we put our actual data in a object called **data**. Wraping the data into an additional object is called **enveloping**, It's a common practice to mitigate some security issues and other problems. There are other standards for response formatting like JSOPN:API, OData JSON protocol.

Finally a RESTful API should always be stateless. In a stateless RESTful API all state is handled on the client. State simply refers to the piece of data in the application that might change over time for example Whether a certain user is 'logged in' or in a page with list of several pages what's the 'current page'. Now the fact that the state should be handled on the client means that each request must contain all the necessary information to process a certain request on the server. So the server should never have to remember the previous request in order to process the current request. Let's take the list of several pages as an example, let's say we are currently on page 5 and we want to move forward to page 6. We can have a simple endpoint like **GET /tours/nextPage** and make a request to it, In this case the server needs to figure out what the current page is and based on that send the next page to the client. It needs to remember the previous request and it needs to handle the request server side. This is exactly what we want to avoid in RESTful APIs. In this case we should create a **/tours/page** endpoint and pass the number 6 to it in order to request page number 6. This way we'll handle state on the client.

![Alt text](img/state.png)
