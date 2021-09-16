const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const { REDIS_CONF } = require('./conf/db');
const { isProd } = require('./utils/env');

// router导入
const index = require('./routes/index');
const users = require('./routes/users');
const errorRouter = require('./routes/view/error');

// error handler错误处理（客户端）
let onerrorConf = {};
if (isProd) {
    onerrorConf = {
        redirect: '/string', // 遇到错误时自动跳转到/error页面
        // 重定向次数问题可能是route路径未完成导致跳转路径循环，修改为redirect: '/'或'/string'时均不报错
    };
}
onerror(app, onerrorConf);

app.test = 'hello world';

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
);

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
// public目录下资源可以静态访问：localhost:3000/stylesheets/style.css

// 后端注册ejs
app.use(
    views(__dirname + '/views', {
        extension: 'ejs',
    })
);

/**
 * 需要在注册router前完成session注册
 */
// 加密
app.keys = ['UIGhlj9078_69dhk'];
// session配置
app.use(
    session({
        key: 'weibo.sid', // cookie name，默认koa.sid
        prefix: 'weibo:sess', // redis key的前缀，默认koa:sess
        cookie: {
            path: '/', // 网站所有目录都可以访问
            httpOnly: true, // 只有server端可以修改cookie
            maxAge: 24 * 60 * 60 * 1000, // cookie登录过期时间
        },
        // ttl: 24 * 60 * 60 * 1000, // redis过期时间,不写时默认设置同时过期
        store: redisStore({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
        }),
    })
);

// routes注册路由，见routes文件夹
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(errorRouter.routes(), errorRouter.allowedMethods());
// 404的*可以匹配所有路由，需要放在最下面注册

// error-handling错误处理（控制台）
app.on('error', (err, ctx) => {
    console.error('服务器错误', err, ctx);
});

module.exports = app;
// 输出一个koa的实例
