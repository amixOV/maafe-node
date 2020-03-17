const mongoose = require('mongoose');

  dataFromDB =  (queryObj, page) => {
    
    return new Promise( async (res, rej) => {
      let dbURL = '';
      
      if(process.env.NODE_ENV !== 'production'){
        //const dotenv = require('dotenv').config();
        dbURL = process.env.DATABASE_URL_LOCAL;
      }else{
        dbURL = process.env.DATABASE_URL;
      }
      
      mongoose.connect(dbURL, {useNewUrlParser: true});
      console.log('----connect to : ' + dbURL);
      console.log('----from page : ' + page);
      let module = '';
      
      if (page === 'customer' || page === 'customer_item') {
        module = require('../mongoose_model/customer_module.js');
      }
      
      if (page === 'product' || page === 'product_item') {
        module = require('../mongoose_model/product_module.js');
      }

      try {        
        const results = await module.find(queryObj);
        console.log(queryObj);
        
        mongoose.connection.close(); 
        res ( results )
      } catch (err) {
        mongoose.connection.close(); 
        throw err;
      }
      
    });
  }

  module.exports = dataFromDB;