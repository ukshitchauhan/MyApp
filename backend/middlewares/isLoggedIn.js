const express = require('express')
const jwt = require('jsonwebtoken')

exports.isLoggedin = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({ message: "Login First" });
        }
       
        const token = authHeader.split(" ")[1]  
       
        if(!token || token =="null"){
            return res.status(401).json({ message: "Login First" });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded

        next()
    }
    catch(err){
        return res.status(401).json({ message: "Invalid" });
    }
}
