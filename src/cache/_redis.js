/*
 *redis中方法在node里实现,get set
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.post, REDIS_CONF.host);
redisClient.on('error', err => {
    console.log('redis error' + err);
});

/**
 * set方法
 * @param {string} key 键
 * @param {string} value 值
 * @param {number} timeout 过期时间，单位是s
 */
function set(key, value, timeout = 60 * 60) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    redisClient.set(key, value);
    redisClient.expire(key, timeout);
}

/**
 * get方法（io操作，返回promise）
 * @param {string} key 键
 */
function get(key) {
    const promise = new Promise((res, rej) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                rej(err);
                return;
            }
            if (val == null) {
                res(null);
                return;
            }
            try {
                res(JSON.parse(val));
            } catch (ex) {
                res(val);
            }
        });
    });
    return promise;
}

module.exports = {
    set,
    get,
};
