//:引入第三方模块
const createError = require('http-errors');//404检测错误页
const express = require("express");
const session = require("express-session");//会话对象
const cookieParser = require("cookie-parser");//解析cookie
const morgan = require("morgan");//生成日志
const mysql = require("mysql");
const cors = require("cors");//跨域
const history = require('connect-history-api-fallback');

//:创建数据库连接池
var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   connectionLimit:15,
   database:"base_one"
})

//:创建web服务器
var server = express();

//:配置跨域
//允许跨域程序端口
server.use(cors({
    //允许哪个程序列表 脚手架
    origin:["http://127.0.0.1:8080",
    "http://localhost:8080"],
    //每次请求验证
    credentials:true
}));

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

//:配置history相关
server.use(history({
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: function(context) {
          return context.parsedUrl.path
      }
    }
  ]
}))

//:配置session对象
server.use(session({
   secret:"128位安全字符串",//加密条件
   resave:true,            //请求更新数据
   saveUninitialized:true  //保存初始化数据
}))

//:指定静态目录  public
server.use(express.static("public"));

//:启动监听端口  4000
server.listen(4000);

// // catch 404 and forward to error handler
// server.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// server.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

// ****************************************
//功能一;完成用户登录验证
server.get("/login",(req,res)=>{
  //1:获取参数 uname upwd
  var n = req.query.uname;
  var p = req.query.upwd;
  //2:创建sql
  var sql =" SELECT uname FROM base_one_list WHERE uname = ? AND upwd = ?";
  //3:发送sql并且结果返回脚手架
  pool.query(sql,[n,p],(err,result)=>{
     //4:如果发生严重错误抛出
     if(err)throw err;
     //5:登录成功用户名密码有错
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"})
     }else{
       //6:登录成功
       //7:将登陆成功的用户id保存至session对象中作为登录成功的凭据
       req.session.uid=result[0].id;
       res.send({code:1,msg:"登录成功",data:result});
     }
  })
})



