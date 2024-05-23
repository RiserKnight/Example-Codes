	
  const app = require('express')();
  const session = require('express-session');
 
  const passport = require('passport');
  const SequelizeStore = require('connect-session-sequelize')(session.Store);
 
  const passportConfig = require('./config/passport');
  const sequelize = require('./singleton/sequelize-singleton');
  app.set('port', 3000);

  //require('./models/Staff');
  require('./models/Session');
 
  passportConfig(passport);
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SequelizeStore({
      db: sequelize,
      table: 'Session',
   }),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
 
  app.post('/sign-in', require('./routes/sign-in'));
  app.post('/sign-out', require('./routes/sign-out'));

  app.listen(app.get('port'), async()=> {

    
    console.log(`Server started on port ${app.get('port')}`);
    await sequelize.authenticate();
     console.log("db connected"); 
 
    
     
   });