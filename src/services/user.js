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
    const res = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'gender', 'city', 'picture'],
        where: whereOpt,
    });
    if (res == null) {
        // 没有查到返回空
        return res;
    }
    // 对可能为空的头像数据进行格式化处理
    const formatRes = formatUser(res.dataValues);
    return formatRes; // 查到返回数据
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
        // 注册时可以不设置昵称和性别
    });
    const data = result.dataValues;
    // // 自己关注自己（为了方便首页获取数据）
    // addFollower(data.id, data.id)
    return data;
}

/**
 * 删除用户
 * @param {string} userName
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName,
        },
    });
    // result返回的是删除数据的行数，大于0代表删除成功
    return result > 0;
}

/**
 * 更新用户信息（用户名和性别不可修改）
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
    // 拼接修改内容
    const updateData = {};
    if (newPassword) {
        updateData.password = newPassword;
    }
    if (newNickName) {
        updateData.nickName = newNickName;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    if (newCity) {
        updateData.city = newCity;
    }

    // 拼接查询条件
    const whereData = {
        userName,
    };
    if (password) {
        whereData.password = password;
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData, // 查询条件
    });
    return result[0] > 0;
    // 修改的行数（查询条件为不可重复的用户名，只会有一项）
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser,
};
