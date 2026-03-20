import express from "express";
// const express = require("express");
const app= express();

let port=8080;
app.listen(port, ()=>{
    console.log(`app is listening in port ${port}`);
    
});

app.get("/",(req, res)=>{
    res.send("You Contacted the root path")
});

app.get("/:username/:id",(req, res)=>{
    let { username, id}=req.params
    let htmlStr=`<h1>Welcome to the page of @${username}</h1>`
    res.send(htmlStr)
});
app.get("/search", (req,res)=>{
    console.log(req.query);
    res.send("no results")
    
}) 
// app.get("/orange",(req, res)=>{
//     res.send("You Contacted orange path")
// });

// app.post("/" ,(req, res) => {
//     res.send("You sent a post request to root")
// });

// app.use((req, res) => {
//      console.log("request recived");
//     res.send({
//         name:"apple",
//         color:"red",
//     });
// });

// Nodemon is a package which is used to automatically restart server with code changes