/* This is a how to on iterating over the mongo cursor. */

const { MongoClient, CURSOR_FLAGS } = require("mongodb");

const mongoURI = 'mongodb://localhost';

const client = new MongoClient(mongoURI);

(async function __runMongoQueries() {
    const connection = await client.connect(mongoURI);
    const database = connection.db('mongomart');

    const items = database.find({});

    // iterating over a for loop using the iterator protocol
    // this method exaust the cursos, good to invoke functions
    // where you need to know the the end of the opration
    for (const item of items) console.log(item)

    // iterating assyncronouslly without exausting the cursor
    while (items.hasNext()) console.log(items);

    // iterating syncronouslly using callbacks
    await items.forEach((items) => console.log(items));
})();
