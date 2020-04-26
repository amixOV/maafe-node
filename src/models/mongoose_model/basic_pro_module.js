const mongoose = require('mongoose')
const Schema = mongoose.Schema;

    const basicSchema = new Schema({

      basic_pro_name :{
        type: String,
        required: true,
        unique: true

      }, 
      basic_pro_cost:{
        type:  Number,
        required: true
      },

      basic_pro_unit:{
        type: String

      },
      
      wheigt:{
        type: Number
      }   

    });

module.exports = mongoose.model('basic_product',  basicSchema);