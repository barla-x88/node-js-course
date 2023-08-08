# Introduction to Mongodb

Run a mongo container using docker with the following command -

```bash
docker run -d -p 27017:27017 -v ./db:/data/db --name mongoserver mongo
```

Then install [mongoshell](https://www.mongodb.com/docs/mongodb-shell/connect/#std-label-mdb-shell-connect) on the host computer and access the server using command -

```bash
mongosh "mongodb://localhost:27017"
```

## Creating a database

we use `use` command to create a database. This command is also used to switch to an already existing database.

```bash
use natours-test
```

to exit mongoshell use `exit()` function.

Inside a database we have collections (equivalent to tables in relational database) and each collection has documents (rows in relational database) in it. The data we create in mongoshell is always document. We need to create a collection before we insert the data.

```
db.tours.insertOne({"name": "The Forest Hiker", "price": 297, "rating": 4.7})
```

`db` is currently used database., `tours` is name of the collection, if this collection doesn't exist yet then it will be created. `insertOne()` inserts data to the collection. we can pass a simple javascript object then it converts it into JSON and BSON.

To check the inserted data use

```bash
db.tours.find()
```

we get back the following response

[
{
_id: ObjectId("64d0c125c07125ea430a51b3"),
name: 'The Forest Hiker',
price: 297,
rating: 4.7
}
]

`show dbs` will show all the databases in system. `show collections` will show all the collections in currently selected database.

To insert multiple documents at once we use the insertMany() function like so, we pass in an array of object -

```
db.tours.insertMany([{ name: "The Sea Explorer", price: 497, rating: 4.8}, {name: "The snow adventurer", price: 997, rating: 4.9, difficulty: "easy"}])
```

## Querying documents

We already know that we can query all the documents in a collection by using `find()` function. It gives us all the documents in a collection without using any search criteria.
Let's search using a filter -

```
db.tours.find({name: "The Forest Hiker"})
```

This returns a document which exactly matches the name property of the the passed object.

### Query operators in mongodb

Let's search for tours that have price below 500. we use the `lte` operator to accomplish this -

```
db.tours.find({price: {$lte: 500}})
```

Thia is how we use query operators in mongodb. `lte` stands for less than or equal to, '$' sign is reserved in mongodb for its operators.

Now let's search for documents using two search criteria. let's find tours that have price less or equal than 500 and rating greater or equal to 4.8

```
db.tours.find({price: {$lt: 500}, rating: {$gte: 4.8}})
```

`lt` stands for "less than", `gte` stands for "greater than or equal to". Here we performed a "AND" query where both criteria must be fullfilled for a document to appear in the result. Let's perform a "OR" query now, we start with an `or` operator which accepts an array of conditions.

```
db.tours.find({$or: [{price: {$lt: 500}}, {rating: {$gte: 4.8}}]})
```

Besides our filter object, we can also pass in an object for projection. projection simply means that we want to select some of the fields in output. Let's only get the name property for tours that match filter criteria.

```
db.tours.find({$or: [{price: {$gt: 500}}, {rating: {$gte: 4.8}}]}, {name: 1})
```

This is the output we get -

<pre>[
  {
    _id: ObjectId(&quot;64d12595e5dbf49fae3f01e3&quot;),
    name: <font color="#26A269">&apos;The Sea Explorer&apos;</font>
  },
  {
    _id: ObjectId(&quot;64d12595e5dbf49fae3f01e4&quot;),
    name: <font color="#26A269">&apos;The snow adventurer&apos;</font>
  }
]</pre>

## updating documents

we can use `updateOne()` function to update a document. This function takes a filter object and a object containing required modification (what value we want to update).

updating "The Snow adventurer"

```
db.tours.updateOne({name: "The snow adventurer"}, {$set: {price: 597}})
```

{
acknowledged: true,
insertedId: null,
matchedCount: 1,
modifiedCount: 1,
upsertedCount: 0
}

we updated a property that already existed. We can also create new properties and set these to new values.
we want to find all tours that have price equal or more than 500 and rating more than 4.8 then add a property in all matching documents.

```
db.tours.updateMany({ price: {$gte: 500}, rating: {$gte: 4.8} }, {$set: {premium:true}})
```

with updateOne() and updateMany() we update parts of a document. we can completely replace the content of the document, for that we use `replaceOne` or `replaceMany`.

## Deleting documents

we have `deleteOne` to delete single document and `deleteMany` to delete mutltiple documents at the same time. Let's delete all the tours that have a rating less than 4.8.

```
db.tours.deleteMany({ rating: {$lt: 4.8} })
```

If you want to delete all documents in a collection we can do it like so -

```
db.tours.deleteMany({})
```

## Using compass app for CRUD operations

Instead of using terminal to work with mongodb we can also use a GUI app that mongodb provides, it's called '[compass](https://www.mongodb.com/products/compass)'.
