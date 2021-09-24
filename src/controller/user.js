/**
 * @description user controller业务逻辑实现
 * 需要等待service返回数据，故是异步函数
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/Res');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    // loginCheckFailInfo,
    // changePasswordFailInfo,
    // changeInfoFailInfo,
    deleteUserFailInfo,
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');

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
        return new ErrorModel(registerUserNameNotExistInfo);
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
        return new ErrorModel(registerUserNameExistInfo);
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender,
        });
        return new SuccessModel();
    } catch (err) {
        // 打印错误信息和错误栈（讲解错误日志时再详细解释）
        console.error(err.message, err.stack);
        return new ErrorModel(registerFailInfo);
    }
}

/**
 * @param {Object} ctx 登陆成功后用ctx.session.userInfo存储用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) {
        // 用户不存在，登录失败
        return new ErrorModel(loginFailInfo);
    }
    // 用户存在，登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel();
}

/**
 * 删除当前用户
 * @param {string} userName
 * 用户名唯一，可以直接用用户名进行删除操作
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName);
    if (result) {
        // 删除成功
        return new SuccessModel();
    }
    // 删除失败
    return new ErrorModel(deleteUserFailInfo);
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
};
