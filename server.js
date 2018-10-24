const express = require("express")

const app = express()

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
    if(request.query.search!=undefined){
        let filteredMessage=[];
        for(var i = 0;i<messages.length;i++){
            if(messages[i].message.includes(request.query.search)){
                filteredMessage.push(messages[i]);
            }
        }
        response.status(200).json(filteredMessage);
    }else{
        response.status(200).json(messages);
        
    }
   
    
})

app.get('/messages/:id',(request,response)=>{
    response.status(200).send('not implemented')
})


app.post('/messages',(request,response)=>{
    response.status(200).send('not implemented')
})

app.put('messages/:id',(request,response)=>{
    response.status(200).send('not implemented')
})

app.delete('/messages/:id',(request,response)=>{
    response.status(200).send('not implemented')
})

app.listen(8080)
