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

const index = require('./routes/index');
const users = require('./routes/users');

// error handler错误处理（客户端）
onerror(app);

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

// error-handling错误处理（控制台）
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
// 输出一个koa的实例
