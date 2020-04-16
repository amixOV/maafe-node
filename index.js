  
  if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }

  const express = require('express');
  const app = express();
  const path = require('path');
  const expressLayouts = require('express-ejs-layouts');
  
  const PORT = 5500;

  const indexRouter = require('./src/routes/index');
  const productRouter = require('./src/routes/product.js');
  const postRouter = require('./src/routes/post.js');
  const adminRouter = require('./src/routes/admin.js');
  const errorRouter = require('./src/routes/error.js');

  const session = require('express-session');
  const flash = require('connect-flash');

  app.use(flash());

  app.set('views', path.join(__dirname, 'src/view'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/layout');
  app.use(expressLayouts);

  app.listen(process.env.PORT || PORT, () => {
    console.log('app listening in port :' + PORT);
  });

  app.use(express.static(__dirname + '/src/public'));

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

  app.get('/', indexRouter);
  app.get('/help', indexRouter);
  app.get('/about', indexRouter);
  app.get('/product', indexRouter);
  app.get('/store', indexRouter);
  app.get('/contact', indexRouter);
  app.get('/logs', indexRouter);
  app.get('/login', indexRouter);
  app.get('/register', indexRouter);
  app.get('/logout', indexRouter);
  
  app.post('/send_data', productRouter);
  app.post('/db_data', productRouter);
  app.post('/saveImage', productRouter);
  
  app.post('/register', postRouter);
  app.post('/login', postRouter);

  app.get('/product_item/:id/:name/:cost', adminRouter);
  app.get('/productAdmin', adminRouter);
  app.get('/customer', adminRouter);
  app.get('/customer_item/:name', adminRouter);
  app.get('/recipes', adminRouter);

  app.get('/401', errorRouter);
  app.get('/404', errorRouter);
  
  app.use( (req, res, next) => {
   // app.get('/404', errorRouter);
    //res.status(404).send("Sorry can't find that!");
    console.log('Sorry cant find this page!');
   // app.get('/404', errorRouter);
    //app.get('/404', errorRouter)
    res.status(404).redirect('/404')
    //res.render('error/404', { title: '404' })
    //res.status(401).render('error/404', { title: '401' });
    next();
  })
 