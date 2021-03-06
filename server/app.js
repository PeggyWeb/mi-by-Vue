var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//中间件处理cookie
var cookieParser = require('cookie-parser');
//发过来的请求进行转换获取参数等
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//拦截登录
app.use(function(req,res,next){
  if(req.cookies.userId){
    next()
  }else{
    //商品的过滤可以是下面这个也可以是req.path == '/goods/list'
    if(req.originalUrl == "/users/login" || req.originalUrl == "/users/logout" || req.originalUrl.indexOf('/goods/list')>-1 || req.originalUrl.indexOf('/goods/stage')>-1){
      next();

    }else{
      res.json({
        status:'10001',
        msg:'当前尚未登录',
        result:''
      })
    }
  }
});


app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.listen(80);

var chatList = {}
io.on('connection',function(socket) {

  socket.on('advisory', function (from,to,msg) {
    if(chatList[from] in chatList){
    }else{
      chatList[from] = socket;
    }
    if(to in chatList){
      chatList[to].emit('answer', msg,from);
      chatList[from].emit('answer', msg,from);
    }else{
      chatList[from].emit('answer', "对方不在");
    }
  });
  socket.on('disconnect',function(){
    let cookie_array = JSON.stringify(socket.handshake.headers.cookie).split(";");
    let cookie_length = cookie_array.length;
    let user_name;
    for(cookie_length--;cookie_length>0;cookie_length--){
      let cookie_item = cookie_array[cookie_length]
          cookie_item = cookie_item.toString();
      if(cookie_item.indexOf("userName")){
        user_name = cookie_array[cookie_length].split("=");
        user_name = user_name[1];
        return;
      }
    }
    chatList[user_name]="";
  });
})

module.exports = app;
