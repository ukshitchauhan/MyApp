const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const postModel = require('../models/post.model')
const generateToken = require('../utils/generateToken')

exports.registerUser = async (req,res) => {
    try{
        const {email,username,password} = req.body

        if(!email || !username || !password){
            return res.status(400).json({
                message:'All fields are required'
            })
        }

        const userExist =await userModel.findOne({email})

        if(userExist){
            return res.status(401).json({
                message:'User Already Register'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({
            username,email,password:hashedPassword
        })

        res.status(200).json({
            message:'Register Succesfully',
            data:{
                id:user._id,
                email:user.email,
                token:generateToken(user._id),
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password ){
            return res.status(401).json({
                message:'All fields are required'
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({
                message:'Email or Password incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message:'Email or Password incorrect'
            })
        }

        res.status(200).json({
            message:'Login succesfully',
            data:{
                id:user._id,
                email:user.email,
                token:generateToken(user._id)
            }
        })
    }   
    catch(err){
        return res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.allPost = async(req,res)=>{
    try{
        const posts = await postModel.find().populate('user')
        res.status(200).json({
            posts
        })
    }
    catch(err){
        res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.dashboard = async(req,res)=>{
    try{
        return res.status(200).json({
            message:'Welcome',
            user:req.user
        })
    }
    catch(err){
        return res.status(401).json({ message: "Invalid" });
    }
}

exports.newPost = async(req,res)=>{
    try{
        const {loggedinUserID,postContent} = req.body

        if(!loggedinUserID || !postContent){
             return res.status(400).json({
                message:'All fields are required'
            })
        }

        const post = await postModel.create({
            content:postContent,
            user:loggedinUserID,
        })

        const user = await userModel.findByIdAndUpdate(loggedinUserID,{
            $push:{posts:post._id}
        })

        res.status(200).json({
            message:'Post Created',
            post
        })

    }
    catch(err){
         return res.status(500).json({
            message:'Something Went Wrong'
        })}
}

exports.findUser = async(req,res)=>{
    try{
        const {id} = req.query

        const user = await userModel.findById(id).populate('posts')

        res.status(200).json({
            user
        })
    }
    catch(err){
        return res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.updateUser = async(req,res)=>{
    try{
        const {id,userName,profilePic} = req.body
        
        await userModel.findByIdAndUpdate(id,{
            image:profilePic,
            username:userName
        })

        res.status(200).json({
            message:'User Profile Updated'
        })
        
    }
    catch(err){
        res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.userPost = async(req,res)=>{
    try{
        const {id} = req.body
        const user = await userModel.findById(id).populate('posts')

        res.status(200).json({
            user
        })
    }
    catch(err){
        res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.updatePost = async(req,res)=>{
    try{
        const {content,id} = req.body

        const updatePost = await postModel.findByIdAndUpdate(
            id,
            {content:content},
            { new: true }
        )

        res.status(200).json({
            message:'Post Updated',
            updatePost
        })
    }
    catch(err){
        return res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}

exports.deletePost = async(req,res)=>{
    try{
        const {id}=req.params

        await postModel.findByIdAndDelete(id)

        res.status(200).json({
            message:'Post Deleted',
            postID:id
        })
    }
    catch(err){
        return res.status(500).json({
            message:'Failed to delete post'
        })
    }
}