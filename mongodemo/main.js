var express = require('express')
const { findProductByName,insertNewProduct,
    getAllProducts,updateProduct,
    findProductById,deleteProductById } = require('./databaseHandler')
var app = express()



app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/delete',async (req,res)=>
{   
    const id = req.query.id
    await deleteProductById(id)
    res.redirect('/view')
})

app.get('/edit',async(req,res)=>{
    const id = req.query.id
    const productToEdit = await findProductById(id)
    res.render("edit",{product:productToEdit})
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/view',async (req,res)=>{
    let results = await getAllProducts()
    res.render('view',{'results':results})
})

app.post('/edit',async(req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    await updateProduct(id,name,price,picture)
    res.redirect('/')
})


app.post('/new', async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    const newProduct = {
        name : name,
        price : Number.parseInt(price),
        pictureURL : picture
    }
    // let client = await MongoClient.connect(url)
    // let db = client.db("GCH1003")
    // let newId = await db.collection("products").insertOne(newProduct)
    await insertNewProduct(newProduct)
    res.render('home')

})

app.post('/search',async(req,res)=>{
    const searchName = req.body.txtName
    const searchResult = await findProductByName(searchName)
    res.render('view',{results:searchResult})


})

const PORT = process.env.PORT || 4000
app.listen(PORT)
console.log("Server is up!")

