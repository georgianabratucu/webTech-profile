const express = require("express")
const Sequelize = require("sequelize")

const app = express()

//param- database,user,parola,obiect cu alte proprietati
const sequelize = new Sequelize('profile','root','',{
    dialect:'mysql',
    host:'localhost'
})
sequelize.authenticate().then(function(){
    console.log('success')
}).catch(function(){
    console.log('o eroare la conectarea la bd')
})

const Messages = sequelize.define('messages',{
    name:Sequelize.STRING,
    subject:Sequelize.STRING,
    message:Sequelize.TEXT
})

app.get('/createdb',function(request,response){
    sequelize.sync({force:true}).then(function(){
        response.status(200).send('tables created')
    }).catch(function(){
        response.status(200).send('could not create database')
    })
})
app.use('/',express.static('statics'))

app.get('/hello',function(request,response){
    console.log(request)
    
    let name = request.query.name;
    let email = request.query.email;
    
    response.status(200).send('hello '+name+' '+email)
})

let messages = [
    {
        subject: "Message",
        message: "hello again"
        
    },
        {
        subject: "Message 2",
        message: "hello 2"}
    ]

app.get('/messages',(request,response)=>{
    Messages.findAll().then((messages)=>{
        response.status(200).json(messages)
    })
   
    
})

app.get('/messages/:id',(request,response)=>{
    response.status(200).send('not implemented')
})
//middleware pt a citi json body
app.use(express.json())
app.use(express.urlencoded())

app.post('/messages',(request,response)=>{
    Messages.create(request.body).then((message)=>{
    response.status(201).json(message)
        
    })
   
})

app.put('messages/:id',(request,response)=>{
    response.status(200).send('not implemented')
})

app.delete('/messages/:id',(request,response)=>{
    response.status(200).send('not implemented')
})

app.listen(8080)
