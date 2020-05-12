  
  if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }

  const express = require('express');
  const app = express();
  const path = require('path');
  const session = require('express-session');
  const flash = require('connect-flash');
  app.use(flash());
  //const checkUser = require('./src/models/check_user');
  const expressLayouts = require('express-ejs-layouts');
  
  const PORT = 5500;

  const indexRouter = require('./src/routes/index');
  const productRouter = require('./src/routes/product.js');
  const postRouter = require('./src/routes/post.js');
  const adminRouter = require('./src/routes/admin.js');
  const errorRouter = require('./src/routes/error.js');

  //const newRout = require('./src/routes/aaa.js')


  app.use(session({
    secret: 'secret',
    cookie: { maxAge: 100 * 60 * 60 * 24 * 30 },
    resave: true,
    saveUninitialized: true
  }))

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

  app.set('views', path.join(__dirname, 'src/view'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/layout');
  app.use(expressLayouts);
  //app.use(checkUser());

  app.listen(process.env.PORT || PORT, () => {
    console.log('app listening in port :' + PORT);
  });

  app.use(express.static(__dirname + '/src/public'));

  app.use('/', indexRouter);
  app.use('/admin', adminRouter)
  //app.use('/aaa', newRout);

  app.post('/send_data', productRouter);
  app.post('/db_data', productRouter);
  app.post('/saveImage', productRouter);
  
  app.post('/register', postRouter);
  app.post('/login', postRouter);
  app.post('/carusel_img', postRouter);
  app.post('/api_covid', postRouter);

  app.get('/401', errorRouter);
  app.get('/404', errorRouter);
  
  app.use( (req, res, next) => {
    res.status(404).redirect('/404')
    next();
  })
 