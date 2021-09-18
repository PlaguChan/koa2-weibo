/**
 * @description user controller业务逻辑实现
 * 需要等待service返回数据，故是异步函数
 */

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/Res');
const { registerUserNameNotExist, registerFailInfo } = require('../model/ErrorInfo');

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

/**
 *
 * @param {Object} param0 用户注册信息
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        // 用户名存在
        return new ErrorModel(registerFailInfo);
    }
    try {
        await createUser({
            userName,
            password,
            gender,
        });
        return new SuccessModel();
    } catch (err) {
        // 打印错误信息和错误栈（讲解错误日志时再详细解释）
        console.error(err.message, err.stack);
        return new ErrorModel(registerFailInfo);
    }
}

module.exports = {
    isExist,
    register,
};
