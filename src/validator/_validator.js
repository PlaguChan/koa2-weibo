/**
 * @description json-schema 校验（规则执行）
 */

const Ajv = require('ajv'); // 校验中间件
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
});

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
}

module.exports = validate;
