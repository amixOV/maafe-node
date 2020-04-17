
const session = require('express-session');
const flash = require('connect-flash');
const express = require('express');
const app = express();

app.use(flash());
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 100 * 60 * 60 * 24 * 30 },
  resave: true,
  saveUninitialized: true
}))
checkUser = () => {


  app.use((req, res, next) => {
    if(req.session.loggedIn){
      res.locals.loggedIn = true;
      res.locals.localName = req.session.loggedIn;
    }else{
      res.locals.loggedIn = false;
      res.locals.localName = '';
    }
    res.locals.msg = req.flash('loginMsg')
    next();
  })
}

  module.exports = checkUser;