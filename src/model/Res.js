/**
 * @description 业务逻辑模型，统一返回格式
 */

/**
 * 基础返回格式
 */
class BaseModel {
    /**
     * 构造函数
     * @param {Object} param0
     */
    constructor({ errno, data, message }) {
        this.errno = errno;
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

/**
 * 成功返回格式,返回data
 */
class SuccessModel extends BaseModel {
    /**
     * @param {Object} data 返回的数据内容
     */
    constructor(data = {}) {
        super({
            errno: 0,
            data,
        });
    }
}

/**
 * 失败返回格式，返回错误码errno
 */
class ErrorModel extends BaseModel {
    /**
     * @param {Object} param0 错误码与错误信息
     */
    constructor({ errno, message }) {
        super({
            errno,
            message,
        });
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
};
