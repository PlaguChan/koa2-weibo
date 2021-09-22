/**
 * @description 加密方法
 */

// node提供的加密模块
const crypto = require('crypto');
// 密钥
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys');

/**
 * md5 加密
 * @param {string} content 需加密明文
 */
function _md5(content) {
    const x = crypto.createHash('md5');
    return x.update(content).digest('hex'); // hex:16进制
}

/**
 * 加密方法
 * @param {string} content 需加密明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`;
    return _md5(str);
}

module.exports = doCrypto;
