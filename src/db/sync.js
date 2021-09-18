/**
 * sequelize同步
 */
const seq = require('./seq');
require('./model/index'); // 引入模型

// // 测试代码，检查连接是否成功
// seq.authenticate()
//     .then(() => {
//         console.log('测试成功');
//     })
//     .catch(err => {
//         console.log('测试失败' + err);
//     });

seq.sync({
    froce: true, // 每次同步前清空表的内容，修改时删除
}).then(() => {
    console.log('同步成功');
    process.exit();
});
