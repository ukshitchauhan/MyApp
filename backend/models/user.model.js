    const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        image:{
            type:String,
        },
        posts:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }],
    },{timestamps:true})

    module.exports = mongoose.model('user',userSchema)