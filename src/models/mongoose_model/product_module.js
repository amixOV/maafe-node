const mongoose = require('mongoose')
const Schema = mongoose.Schema;

    const productSchema = new Schema({
      product_id :{
        type : String,
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
      },

      pro_contant:{
        type:  String
      },

      single_img:{
        type: String,
        required: true
      },

      multy_img:{
        type: String,
      }

    });

module.exports = mongoose.model('product',  productSchema);