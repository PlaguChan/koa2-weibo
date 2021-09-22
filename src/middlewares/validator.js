/**
 * @description 自定义json-schema中间件
 * @description 实现信息校验功能
 */

const { ErrorModel } = require('../model/Res');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

/**
 *生成schema验证的中间件
 * @param {function} userValidate 各种验证函数
 * @returns
 */
function genValidator(validateFunction) {
    /**
     *定义中间件：一个异步的校验函数
     */
    async function validator(ctx, next) {
        const data = ctx.request.body;
        const error = validateFunction(data);
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return;
        }
        // 验证成功则继续执行
        await next();
    }
    return validator; // 返回中间件
}

module.exports = {
    genValidator,
};
