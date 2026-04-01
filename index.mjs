// we have to make a https backend
import express from 'express' // import the https library
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'; 
async function connection(){
    await mongoose.connect("/csi")
    console.log("mongoose connected");
}
const app = express();
connection();
const UserSchema = new mongoose.Schema({
    name:String,
    password:String,
    div:Number
}) 

const User = mongoose.model('User',UserSchema);


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
app.post('/signup',async (req, res) => {
    const user_name = req.body.name;
    const user_password = req.body.password;
    const user_div = req.body.div;
    const hashed_password = bcrypt.hashSync(user_password,5);
    const data = await User.create({
        name:user_name,
        password:hashed_password,
        div:user_div
    });
    // const existingUser = user.find((u) => u.user === user_name);
    // if (existingUser) {
    //     return res.status(409).json({
    //         msg: "User already exists"
    //     });
        
    // }
    // user.push({user:user_name,password:user_password});
    console.log(`user created with user name ${user_name} with the user id ${data._id} `)
    res.status(201).send("user created")

})

app.post('/update',async (req,res)=>{
    const id = req.body.id;
    const data = await User.updateOne({_id:id},{
        name:"grins sah"
    });

    return res.send("updated");

})

app.post('/login',async (req,res)=>{
    const user_name = req.body.name;
    const user_password = req.body.password;
    let flag = false;
    for(let i = 0;i<(user.length);i++){
        const hashed_password =  bcrypt.hashSync(user[i].password,1);
        console.log(`password ${user[i].password}  sha256 hash :${ hashed_password }`);
        // bcrypt.compare()p
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

/*
promise is noting but a asycn call
print("hello")
// async code => is still running 
print("next")

*/

app.post('/validate', (req,res)=>{
    const passwordHased = req.body.hashed;
    const password = req.body.password;
    //
    bcrypt.compare(password,passwordHased).then((flag)=>{
        console.log(flag);
        if(flag){
            return res.send("password match")
        }else{
            return res.send("password not matched");
        }
    })
})
app.listen(3000,()=>{
    console.log("backend is running on port 3000")
});

