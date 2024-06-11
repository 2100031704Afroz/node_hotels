const mongoose = require('mongoose')
const { type } = require('server/reply')
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    work:{
        type:String,
        enum:['Chef','Waiter','Manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
})

//create person model

const Person = mongoose.model('Person', personSchema)
module.exports = Person;