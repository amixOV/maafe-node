const mongoose = require('mongoose');

dataFromDB = (queryObj, page) => {
  let dbURL;
  let module;
  if(process.env.NODE_ENV !== 'production'){
    //const dotenv = require('dotenv').config();
    dbURL = process.env.DATABASE_URL_LOCAL;
  }else{
    dbURL = process.env.DATABASE_URL;
  }
  
  if (page === 'customer' || page === 'customer_item' || page === 'login') {
    module = require('../mongoose_model/customer_module.js');
  }
  
  if (page === 'productAdmin' || page === 'product_item') {
    module = require('../mongoose_model/product_module.js');
  }

  mongoose.connect(dbURL, {useNewUrlParser: true});
  return new Promise ((resolve, reject) => {
    //let results = module.find(queryObj)
    module.find(queryObj)
    .then( data => {
      console.log(queryObj);
      //console.log(data);
      console.log('----connect to : ' + dbURL);
      console.log('----from page : ' + page);
      resolve(data);
    })
    .catch(err => {
      console.log('====================error : ' + error);    
      reject(err)
    })
    /*
    try {
      console.log(queryObj);
      console.log('----connect to : ' + dbURL);
      console.log('----from page : ' + page);
      resolve(results);
    } catch (error) {
      console.log('====================error : ' + error);    
      reject(error)
    }
    */
  }).catch(error => {
    console.log(error);
    reject(error)
    
  })
  
  
}
  mongoose.connection.close();  
  module.exports = dataFromDB;