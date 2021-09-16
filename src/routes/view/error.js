/**
 * error404router
 */

const router = require('koa-router')();

// error
router.get('/error', async (ctx, next) => {
    await ctx.render('error');
});

// 404(*没有对应路由)
router.get('*', async (ctx, next) => {
    await ctx.render('404');
});
module.exports = router;
