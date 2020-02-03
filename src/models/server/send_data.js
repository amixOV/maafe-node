const mongoose = require('mongoose');

insertToDB = data => {
    return new Promise((res, rej) => {
      mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
        
      const product = require('./../product_module.js');
      let newpro = new product( data );
      newpro.save( ( err, product ) => {
        if (err){
          mongoose.connection.close(); 
          rej( err );
        } 
          mongoose.connection.close(); 
          res( product ) ;
      });
    });
  }

  module.exports = insertToDB;