const mongoose = require('mongoose')
require('dotenv').config()

// const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = process.env.MongoURL

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb server')
})

db.on('error',(err)=>{
    console.log('Mongodb connection error')
})

db.on('disconnected',()=>{
    console.log('Mongodb disconnected')
})

module.exports = db