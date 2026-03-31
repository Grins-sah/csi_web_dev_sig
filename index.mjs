// we have to make a https backend
import express from 'express' // import the https library
import bcrypt from 'bcrypt'

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
app.post('/signup', (req, res) => {
    const user_name = req.body.name;
    const user_password = req.body.password;
    const existingUser = user.find((u) => u.user === user_name);
    if (existingUser) {
        return res.status(409).json({
            msg: "User already exists"
        });
        
    }
    user.push({user:user_name,password:user_password});
    console.log(`user created with user name ${user_name} `)
    res.status(201).send()

})

app.post('/login',async (req,res)=>{
    const user_name = req.body.name;
    const user_password = req.body.password;
    let flag = false;
    for(let i = 0;i<(user.length);i++){
        const hashed_password =  bcrypt.hashSync(user[i].password,5);
        console.log(`password ${user[i].password}  sha256 hash :${ hashed_password }`);
        // bcrypt.compare()
        if(user[i].user ===user_name && user[i].password ===user_password){
            return res.json({
                user:user_name,
                msg:"sign in"
            })
            
            
        }
    }
    if(!flag){
        return res.status(404).json({
            user:user_name,
            msg:"not found"
        })
    }


})
app.listen(3000,()=>{
    console.log("backend is running on port 3000")
});

