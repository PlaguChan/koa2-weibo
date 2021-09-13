const { isProd } = require("./utils/env");

let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};

let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "mysql123456",
  dialect: "mysql",
  port: "3306", //默认
  database: "mytest",
};

//线上的配置(暂时照抄线下环境，以后改)
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };

  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "mysql123456",
    dialect: "mysql",
    port: "3306", //默认
    database: "mytest",
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
