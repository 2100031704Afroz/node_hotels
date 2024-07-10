const mongoose = require('mongoose')
const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    price:{
        type:Number,
        requried:true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour']
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }  
})

const MenuItem = mongoose.model('MenuItems',menuItemSchema)
module.exports = MenuItem;