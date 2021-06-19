const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin= require("./controller/signin");
const signup= require("./controller/signup");
const imageurl= require("./controller/imageurl");
const app = express();
const db = knex({
    // Enter your own database information here based on what you created
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post('/signin',(req,res)=>{signin.handelSignin(req,res,db,bcrypt)});
app.post('/signup',(req,res)=>{signup.handelSignup(req,res,db,bcrypt)});
app.post('/imageurl',(req,res)=>{imageurl.handelImgaeurl(req,res)});

app.listen(3002,()=>{
    console.log("app is running on port 3002")

})