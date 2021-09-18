/**
 * @description 格式化
 * 内部文件内部方法通常用下划线开头命名
 */

const { DEFAULT_PICTURE } = require('../conf/constant');

/**
 * 格式化头像图片，未自定义头像用户将使用默认头像
 * @param {Object} obj 用户对象
 * @returns
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE;
    }
    return obj;
}

/**
 *格式化用户信息
 * @param {Array|Object} list 用户列表或单个用户
 */
function formatUser(list) {
    if (list == null) {
        return list;
    }
    if (list instanceof Array) {
        // 参数是数组
        return list.map(_formatUserPicture);
    }
    // 单个对象
    return _formatUserPicture(list);
}

module.exports = { formatUser };
