//require all installs
const bodyParser = require('body-parser');
const path = require('path')
const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');
const indexRoute = require('./Router/indexRouter');
const shopRoute = require('./Router/shopRouter');
const User = require('./Model/user');
const errorController = require('./Controller/error/errors');
const database = require('./Util/util')

const MongoDB_URI = database.db()

//protect against other sites
const csurfProtection = csrf();

//backup sessions in db
const store = new MongoDBStore({
    uri: MongoDB_URI,
    collection: 'mySessions'
  });



app.set('view engine', 'ejs');
app.set('views', 'Views');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'Public')));

// create the session middleware
app.use(session({
    secret: 'my secret',
    store: store,
    resave: false,
    saveUninitialized: false
}));


//  app.use(csurfProtection);

 app.use(flash()); //flash error message
app.use((req, res, next)=>{
    // res.locals.csrfToken = req.csrfToken();
    next();
})

//store user in session
app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
  
      .then(user => {
        if (!user) {
            console.log('No User')
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
});

app.use(indexRoute);
app.use(shopRoute);


//Errors, Page Not Found
app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).render('errors/505', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});



mongoose.connect(MongoDB_URI);
const db = mongoose.connection;
db
.then(() => {
    console.log('Connected!')
    app.listen(8000)
    
})
.catch(err => console.log(err));
