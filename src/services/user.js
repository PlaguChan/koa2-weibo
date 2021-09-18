/**
 * @description user service
 * 操作数据库
 */

// 引入模型以操作数据
const { User } = require('../db/model/index');
// 引用数据的格式化方法
const { formatUser } = require('./_format');

/**
 * 获取用户信息（登录和校验可以共用）,返回值是dataValues
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    const whereOpt = {
        userName,
    };
    if (password) {
        Object.assign(whereOpt, { password });
        // assign方法参数需要是对象
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'gender', 'city', 'picture'],
        where: whereOpt,
    });
    if (result == null) {
        // 没有查到返回空
        return result;
    }
    // 对可能为空的头像数据进行格式化处理
    const formatResult = formatUser(result.dataValues);
    return formatResult; // 查到返回数据
}

/**
 *创建用户
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName,
        // 注册时可以不设置昵称
    });
    return result.dataValues;
}

module.exports = {
    getUserInfo,
    createUser,
};
