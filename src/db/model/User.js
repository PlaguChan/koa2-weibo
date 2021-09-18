/**
 * @description 用户数据模型（表）
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true, // 用户名不可重复
        comment: '用户名,唯一',
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '用户密码',
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '用户昵称',
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3, // 默认值写法
        comment: '性别（1 男性，2 女性，3 保密）',
    },
    city: {
        type: STRING,
        comment: '用户所在地',
    },
    picture: {
        type: STRING, // url连接
        comment: '头像，图片地址',
    },
});

module.exports = User;
