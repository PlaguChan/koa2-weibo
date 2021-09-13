const Sequelize = require("sequelize");
const { MYSQL_CONF } = require("../conf/db");
const { isProd } = require("../utils/env");
//引用

const { host, user, password, database } = MYSQL_CONF;
const conf = {
  host,
  dialect: "mysql",
};

//测试环境时不打印
if (isTest) {
  conf.logging = () => {};
}

//线上环境使用连接池(线下不用)
if (isProd) {
  conf.pool = {
    max: 5, //连接池中最大连接数
    min: 0, //最小
    idle: 1000, //连接10s不使用则被释放
  };
}

//实例化
const seq = new Sequelize(database, user, password, conf); //数据库的名字,用户名，密码，其他信息

// //测试代码，检查连接是否成功
// seq
//   .authenticate()
//   .then(() => {
//     console.log("测试成功");
//   })
//   .catch((err) => {
//     console.log("测试失败" + err);
//   });

module.exports = seq;
//输出已连接到mytest数据库的实例
