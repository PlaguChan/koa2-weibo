/**
 * @description user controller业务逻辑实现
 * 需要等待service返回数据，故是异步函数
 */

const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/Res');
const { registerUserNameNotExist } = require('../model/ErrorInfo');

/**
 *
 * @param {string} userName 用户名是否存在
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        // 用户名存在
        return new SuccessModel(userInfo);
        // {errno:0,data:{...}}
    } else {
        return new ErrorModel(registerUserNameNotExist);
        // {errno:10003,message: '用户名不存在'}
    }
}

module.exports = {
    isExist,
};
