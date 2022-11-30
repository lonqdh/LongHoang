var express = require('express')
var app = express()
var fs = require('fs')

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.render('home')
})

app.get('/student', function (req, res) {
    res.render('student')
})

app.post('/register', function (req, res) {
    let name = req.body.txtName
    let country = req.body.country
    let content = name + ";" + country
    // fs.writeFile('test.txt', content, function (err) {
    //     if (err)
    //         console.log(err);
    //     else
    //         console.log('Append operation complete.');
    // });
    fs.writeFileSync("test.txt",content);
    res.render('confirm', { 'name': name, 'country': country })


    
    fs.readFile('test.txt', function (err, saved) {
        if (err) throw err;

    console.log(content);
    });
});

app.get('/read',function(req,res)
{
    const content = fs.readFileSync("test.txt","utf-8")
    let a = content.split(";")
    // res.render("read",{'content':content})
    res.render("read",{'name':a[0], 'country':a[1]})
})


const PORT = 5000
app.listen(PORT)
console.log("Server is running!")