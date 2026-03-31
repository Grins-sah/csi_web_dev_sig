// we have to make a https backend
import express from 'express' // import the https library
const app = express();
app.use(express.json()); // 
app.get('/',(req,res)=>{ // lambda function 
    res.json({
        "msg":"hello"
    })
})
const a = [];
app.post('/user',(req,res)=>{
    console.log(req.body);
    a.push(req.body);
    res.json({
        msg:"user added"
    })
})
app.get('/user',(req,res)=>{
    res.json({
        "user":a
    })
})
app.listen(3000,()=>{
    console.log("backend is running on port 3000")
});

