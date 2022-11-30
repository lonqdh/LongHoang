var express = require('express')
var app = express()
var fs = require('fs')
const crypto = require("crypto")

const { request } = require('http')

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

const fileName = "data.txt"

app.post('/search',(req,res)=>{
    const name = req.body.txtName
    let arr = []
    readDataFile(arr)
    const champFound =  arr.filter((value,index,arr)=>{
        return value.name == name
    })
    res.render('view',{'ds': champFound})
})

app.post('/new',(req,res)=>{
    const name = req.body.txtName
    const country = req.body.country
    if(name.trim().length==0)
    {
        res.render("new",{'errorMsg':"The name must be filled"})
        return
    }
    const uuid = crypto.randomUUID()
    const content = uuid + ";" + name + ";" + country + "\n"
    fs.appendFileSync(fileName,content)
    res.redirect('/')
})

app.post('/edit',(req,res)=>{
    //lay thong tin tu user input
    const id = req.body.txtId
    const name = req.body.txtName
    const country = req.body.country
    
    //tim Champion co id can edit
    let arr = []
    readDataFile(arr)
    let champFound = arr.filter((value,index,arr)=>{
        return value.id = id
    })

    //cap nhat trong array
    champFound[0].name = name
    champFound[0].country = country
    //update file
    writeDataFile(arr)
    res.redirect('/view')
})

app.get('/view',(req,res)=>{
    let arr = []
    readDataFile(arr)
    res.render('view',{ds:arr})
})

app.get('/edit',(req,res)=>{
    const id = req.query.id
    let arr = []
    readDataFile(arr)
    const champ = arr.filter((value,index,arr)=>{
        return value.id == id
    })
    res.render("edit",{'champ':champ[0]})
})

app.get('/delete',(req,res)=>{
    const name = req.query.name
    let arr = []
    readDataFile(arr)
    let result = arr.filter((value,index,array)=>{
        return value.name != name
    })
    console.log(result)

    writeDataFile(result)
    res.render('view',{ds:arr})
})

app.get('/new',(req,res)=>{
    res.render('new')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = 8000
app.listen(PORT)
console.log("Server is running!")

function readDataFile(arr) {
    const fileContent = fs.readFileSync(fileName, "utf-8").trim()
    if (fileContent.length==0) {
        return;
    }
    const lines = fileContent.split("\n")
    lines.forEach(element => {
        let nameAndCountry = element.split(";")
        const champion = {
            id : nameAndCountry[0],
            name: nameAndCountry[1],
            country: nameAndCountry[2]
        }
        arr.push(champion)
    })
}

function writeDataFile(result)
{
    let content = "";
    result.forEach(element => {
        content += element.id + ";" + element.name + ";" + element.country + "\n"
    });
    fs.writeFileSync(fileName,content)
}