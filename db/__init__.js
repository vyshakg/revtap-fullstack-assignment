const { MongoClient } = require("mongodb");
const db = require("./db.json");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Connection URI
const uri = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection

    const dbo = client.db("revtap");
    let collections = await dbo.collections();
    if (collections.length > 0) {
      await dbo.dropCollection("customers");
      await dbo.dropCollection("orders");

      console.log("Database cleared!!");
    }
    const customers = await dbo.createCollection("customers");
    const orders = await dbo.createCollection("orders");

    for (let i = 0; i < 30; i++) {
      let cusObject = db.customers[getRandomInt(0, 99)];
      cusObject = await customers.insertOne({
        firstName: cusObject.firstName,
        lastName: cusObject.lastName,
        email: cusObject.email,
        createdAt: new Date(cusObject.created),
      });
      console.log(cusObject.ops[0]._id);

      for (let j = 0; j < getRandomInt(1, 4); j++) {
        let ordObject = db.orders[getRandomInt(0, 99)];
        await orders.insertOne({
          customer: cusObject.ops[0]._id,
          product: ordObject.product,
          quantity: getRandomInt(1, 4),
          price: +ordObject.price,
          createdAt: new Date(ordObject.created),
        });
      }
    }

    console.log("Database populated!!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
