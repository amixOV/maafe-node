const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const style = '/css/style.css';
router.use(express.urlencoded({extended: false }));
router.use(flash());
router.use(express.json({limit:"100kb"}));

router.post('/register', async (req, res) => {

  let arrForm = {};
  try{
    delete req.body.action;
    arrForm = Object.assign({}, req.body);
    let hashPass = await bcrypt.hash(req.body.customer_password, 10);
    req.body.customer_password = hashPass;
    const insertToDB = require('../models/server/send_data');
    const page = path.basename(req.headers.referer);
    await insertToDB(req.body, page);
    req.flash('loginMsg', 'you are connected from register !');
    req.session.loggedIn = req.body.customer_name;
    res.redirect('/');
    
  } catch (err) {
      console.log(err);
      res.render( 'register', {title: 'register', style, arrForm } );
  }

  
});

router.post('/login', async (req, res, next) => {

  const dataFromDB = require('./../../src/models/server/get_data.js');
  const page = path.basename(req.headers.referer);
  const queryObj = {customer_name : req.body.name};
  let customer;
  
  try {
    if(req.body.password === '' || req.body.name === ''){
      req.flash('loginMsg', `you need to write password`);
      res.render( 'login', {title: 'login', style } );
    }else{
      customer = await dataFromDB(queryObj, page);
      if(customer.length === 0){
        req.flash('loginMsg',`there is no customer named ${req.body.name}`);
        res.render( 'login', {title: 'login', style } );
      }else{

        try {

          let check = await bcrypt.compare(req.body.password, customer[0].customer_password);
          if(!check){
            req.flash('loginMsg',`the password ${req.body.password} is not correct !!!`);
            res.render( 'login', {title: 'login', style } );
          }else{
            req.flash('loginMsg', `the password ${req.body.password} is  correct !!!`);
            req.session.loggedIn = req.body.name;
            
            req.flash('loginMsg', 'you are connected from login !');
            res.redirect( '/' );
          }            
        } catch (error) {
          console.log(error);     
        }
      }
    }
  } catch (error) {
    console.log('------errrrror : ' + error);
    next( error)
  }
})

module.exports = router;