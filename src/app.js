const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const index = require("./routes/index");
const users = require("./routes/users");

// error handler错误处理（客户端）
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
//public目录下资源可以静态访问：localhost:3000/stylesheets/style.css

//后端注册ejs
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger和上面的logger（）重复，可以全部注释掉
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// routes注册路由，见routes文件夹
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling错误处理（控制台）
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
