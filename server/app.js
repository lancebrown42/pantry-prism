var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {database, userName, password, server, authentication} = require('./model/config');
const dbConfig = require('./model/config');
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(database, userName, password,{
  host: server,
  dialect: 'mssql',
  dialectOptions: {
    authentication: authentication,
    options:{
      useUTC: false,
      dateFirst: 1
    }
  }
})

//models
const User = sequelize.define('User', require('./model/user'),{timestamps: false, createdAt: false, updatedAt: false, tableName: 'TUsers',initialAutoIncrement: 1});
const UserItem = sequelize.define('UserItem', require('./model/UserItem'), {timestamps: false, createdAt: false, updatedAt: false, tableName: 'TUserInventories',initialAutoIncrement: 1})
const Item =  sequelize.define('Item', require('./model/Item'), {timestamps: false, createdAt: false, updatedAt: false, tableName: 'TInventories',initialAutoIncrement: 1})


/**old db conn */
// var db = require('./model/dbConn');
// var dbConn = db;

// check db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync()
  .then(() => {
    console.log(`Database & tables synced!`);
    User.belongsToMany(Item,
      {through: 'UserItem',
        foreignKey: {
        
        name: 'intUserId',
      }});
    Item.belongsToMany(User,
      {through: 'UserItem',
      foreignKey: {
        name:'intInventoryId',
      }});
    User.hasMany(UserItem,{foreignKey: {
        
      name: 'intUserId',
    }});
    UserItem.belongsTo(User,{foreignKey: {
        
      name: 'intUserId',
    }});
    Item.hasMany(UserItem,{foreignKey: {
      name:'intInventoryId',
    }});
    UserItem.belongsTo(Item,{foreignKey: {
      name:'intInventoryId',
    }});

      
  }).then(()=>{
    User.count().then(users=> console.log(users + " users in db"));
      Item.count().then(items=> console.log(items + " items in db"));
      try{
        const findoneUser = User.findOne({where:{
        intUserID : 1
      },
      include:{
        model: UserItem,
        include:{
          model: Item
        }
      }
    }).then((findoneUser)=>{

      console.log(`Findone: "${findoneUser.strFirstName}"`)
    }

    )
  }catch(error){
    console.error(error)
  }
  });

 




var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
