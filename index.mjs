import express from 'express'   // import of the express object fromy the express module .mjs
// const express = require('express) .js
const app = express();      // this opens a tcp socket with the os
import cors from 'cors'
app.use(express.json())
app.use(cors());

app.get('/',(req,res)=>{
    // it will talk with the db
    res.json({
        msg:"hello csi members"
    })
})
app.listen(5000,()=>{
    console.log("backend is running on port 5000");
});


