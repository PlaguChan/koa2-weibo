/**
 * jest 用于测试server
 */

const request = require('supertest');
const server = require('../src/app').callback();
// app.js输出了一个koa实例，koa提供了一个封装的callback方法
// 作为原生nodejs的callback来接收事件，有参数 req和 res

module.exports = request(server);
//发起app.js的请求,返回一个promise对象
