/**
 * 环境变量
 */

const ENV = process.env.NODE_ENV;
// console.log(ENV);
// 不同的命令的NODE_ENV不同

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test',
};
