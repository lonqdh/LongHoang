var mongoClient = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/'
var url = "mongodb://127.0.0.1:27017/"
// var url = "mongodb://0.0.0.0:27017/"
const { Int32, ObjectId } = require('bson')

async function insertNewProduct(newProduct) {
    let db = await getDB()
    let id = await db.collection("products").insertOne(newProduct)
    return id
}

async function getDB() {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1003")
    return db
}

async function getAllProducts() {
    let db = await getDB()
    let results = await db.collection("products").find().toArray()
    return results
}

async function updateProduct(id, name, price, picture) {
    let db = await getDB()
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "picture": picture } })
}

async function findProductById(id) {
    let db = await getDB()
    const productToEdit = await db.collection('products').findOne({ _id: ObjectId(id) })
    return productToEdit
}

async function deleteProductById(id) {
    let db = await getDB()
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}

async function findProductByName(nameSearch){
    let db = await getDB()
    const result = await db.collection("products").find({name: new RegExp(nameSearch, 'i')}).toArray()
    return result;
}


module.exports = { findProductByName,insertNewProduct,getAllProducts,updateProduct,findProductById,deleteProductById }






