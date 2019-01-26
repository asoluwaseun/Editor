const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mongoose = require('mongoose')
const formidable = require('formidable')
const fs = require('fs')



let app = express()
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')
mongoose.Promise = global.Promise

// mongoose.connect("mongodb://localhost:27017/newDataBase",{ useNewUrlParser: true })

const port = 80
const api = '76945312929e2faebd4f129b87abfded'

app.get('/',(req,res) =>{
    
    res.render('editor',{fileContent: null, fileGot: null}) 
    // fs.readdir('/public/savedfiles/', function(err, items) {
    //     res.render('editor',{fileContent: items, fileGot: null}) 
    // }); 
})

app.post('/saveFile',(req,res)=>{
   let fileName = req.body.fileName;
   let fileContent = req.body.fileContent;
    fs.appendFile(`/public/savedfiles/${fileName}.html`, fileContent, function (err) {
        if (err) throw err;
        fs.readFile(`/public/savedfiles/${fileName}.html`,'utf8',function(err, data) {
            console.log(data)
            fs.readdir('/public/savedfiles/', function(err, items) {
                res.render('editor',{fileContent: items, fileGot: fileGot}) 
            }); 
            }); 
      });
    // var form = new formidable.IncomingForm()
    
    // form.parse(req, function (err,fields,files){
    //     // console.log(files.pp.path)
    //     // res.send("success")
    //     var tmp = files.pp.path;
    //     var perm = 'C:/nodeclass/public/savedfiles/' + fields.fileName +".html" 
    //     fs.rename(tmp,perm,(err)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             res.send("success")
    //         }
    //     })
     
    // })
})

app.get('/getFile/:fileN',(req,res)=>{
    fs.readFile(`/public/savedfiles/${req.params.fileN}`,'utf8',function(err, data) {
    console.log(data)
        let fileGot = data;
    fs.readdir('/public/savedfiles/', function(err, items) {
        res.render('editor',{fileContent: items, fileGot: fileGot}) 
    }); 
    });
})


app.listen(process.env.PORT || 80,()=>{
    console.log("Server started and listening at " + port)
  
})