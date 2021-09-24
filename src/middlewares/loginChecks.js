/**
 * @description 登陆验证的中间件
 */

const { ErrorModel } = require('../model/Res');
const { loginCheckFailInfo } = require('../model/ErrorInfo');

/**
 * API登录验证失败，返回给前端信息
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next();
        return;
    }
    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 * 页面登录验证失败，会直接跳转到登录页（原信息存储在url里，在登陆后自动跳转（前端完成））
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next();
        return;
    }
    // 未登录
    const curUrl = ctx.url;
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
    loginCheck,
    loginRedirect,
};
