const mongoose = require('mongoose');

  dataFromDB =  () => {
    return new Promise( async (res, rej) => {
      mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
      
      const product = require('./../product_module.js');
      //let newpro = new product( data );
      try {
        const results = await product.find({});
        mongoose.connection.close(); 
        //console.log(results);
        res ( results )
      } catch (err) {
        mongoose.connection.close(); 
        throw err;
      }
      
    });
  }

  module.exports = dataFromDB;