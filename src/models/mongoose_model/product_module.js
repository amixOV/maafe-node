const mongoose = require('mongoose')
const Schema = mongoose.Schema;

    const productSchema = new Schema({
      product_id :{
      type : String,
        required: true,
        index: true,
        unique: true
     
        /* type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true, */
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
        type: String
      },
/* 
      basic_product:{
       type: schema.objectId,
       ref: 'basic_product'

      },
      wheigt:{
        type: Number
      }   
 */
    });

module.exports = mongoose.model('product',  productSchema);