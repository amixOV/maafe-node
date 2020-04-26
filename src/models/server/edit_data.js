const mongoose = require('mongoose');

editData = (data, page) => {
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
        if (page === 'productAdmin') {
            module = require('../mongoose_model/product_module.js');
        }
        if (page === 'register') {
            module = require('../mongoose_model/customer_module.js');
        }
        //const conditions = { username: Username, code: Key };
        let newpro = new module( data );
        const update = { banned: true };
        newpro.findOneAndUpdate(data, update, (err) => {
            if (err){
                res.json('nope');
            }
            else{
                res.json('yep');
            }
        });
        /*
        newpro.findOneAndUpdate( ( err, module ) => {
            if (err){
            mongoose.connection.close(); 
            rej( err );
            } 
            mongoose.connection.close(); 
            res( module ) ;
        });
        */
    });
  }

  module.exports = editData;