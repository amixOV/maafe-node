const mongoose = require('mongoose');

insertToDB = (data, page) => {
    return new Promise((res, rej) => {
      if(process.env.NODE_ENV !== 'production'){
        //const dotenv = require('dotenv').config();
        dbURL = process.env.DATABASE_URL_LOCAL;
      }else{
        dbURL = process.env.DATABASE_URL;
      }
      mongoose.connect(dbURL, {useNewUrlParser: true});
      let module = '';
      if (page === 'customer') {
        module = require('../mongoose_model/customer_module.js');
      }
      if (page === 'product') {
        module = require('../mongoose_model/product_module.js');
      }
      let newpro = new module( data );
      newpro.save( ( err, module ) => {
        if (err){
          mongoose.connection.close(); 
          rej( err );
        } 
          mongoose.connection.close(); 
          res( module ) ;
      });
    });
  }

  module.exports = insertToDB;