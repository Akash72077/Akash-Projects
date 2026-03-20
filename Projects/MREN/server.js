const express = require("express");
const mongoose = require("mongoose");
const devuser = require("./devusermodel");
const jwt=require('jsonwebtoken');
const app = express();

app.use(express.json());

mongoose.connect(
"mongodb+srv://Akash72077:Akash%4012345@cluster0.loljszk.mongodb.net/test"
)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.post("/register", async (req, res) => {
  try {
    const { fullname, email, mobile, skill, password, confirmpassword } =
      req.body;
    const exist = await devuser.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Registered");
    }
    if (password != confirmpassword) {
      return res.status(403).send("Password Invalid");
    }
    let newUser = new devuser({
      fullname,
      email,
      mobile,
      skill,
      password,
      confirmpassword,
    });
    await newUser.save();
    return res.status(200).send("User Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.post('/login' , async(req,res)=>{
    try{
        const {email,password}=req.body;
        const exist =await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('User Not Exist')
        }
        if(exist.password!=password){
            return res.status(400).send('Password Invalid')
        }
         
        let payload={
            user:{
                id :exist.id
            }

        }
        jwt.sign(payload,'jwtpassword',{expiresIn:360000000},
            (err,token)=>{
                if(err) throw err
                return res.json({token})
            }
        )
    }catch(err){
       console.log(err);
       return res.status(500).send('Server Error')
    }
})


app.listen(5000, () => console.log("Server is running..."));
