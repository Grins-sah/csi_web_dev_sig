// we have to make a https backend
import express from 'express' // import the https library
const app = express();
app.use(express.json()); // 
app.get('/',(req,res)=>{ // lambda function 
    res.json({
        "msg":"hello"
    })
})
const user = [];
app.post('/user',(req,res)=>{
    console.log(req.body);
    user.push(req.body);
    res.json({
        msg:"user added"
    })
})
app.get('/user',(req,res)=>{
    res.json({
        "user":user
    })
})
app.post('/signup',(req,res)=>{
    const user_name = req.body.name;
    const user_password = req.body.password;
    user.push({user:user_name,password:user_password});
    // does this user exist or not
    console.log(`user created with user name ${user_name} `)
    res.status(201).send()

})
app.post('/login',(req,res)=>{
    const user_name = req.body.name;
    const user_password = req.body.password;
    let flag = false;
    user.forEach((v)=>{
        console.log(v);
        if(v.user ===user_name && v.password ===user_password){
            res.json({
                user:user_name,
                msg:"sign in"
            })
            flag = true;
            return;
        }
    })
    if(!flag){
        res.status(404).json({
            user:user_name,
            msg:"not found"
        })
    }


})
app.listen(3000,()=>{
    console.log("backend is running on port 3000")
});

