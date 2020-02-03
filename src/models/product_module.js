const mongoose = require('mongoose')
const Schema = mongoose.Schema;

    const productSchema = new Schema({
      product_id :{
        type : Number,
        required: true,
        index: true,
        unique: true
      },

      product_name :{
        type: String,
        required: true,
        unique: true

      }, 
      pro_cost:{
        type:  Number,
        required: true
      }

    });

module.exports = mongoose.model('product',  productSchema);