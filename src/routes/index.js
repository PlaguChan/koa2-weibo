const router = require('koa-router')();
const { loginCheck, loginRedirect } = require('../middlewares/loginChecks');

router.get('/', async (ctx, next) => {});

// 动态路径参数:XXX和ctx.params
router.get('/myindex/:hhh/:hihihi', async (ctx, next) => {
    const { hhh, hihihi } = ctx.params;
    ctx.body = {
        hihihi,
        hhh,
    };
});

router.get('/string', loginRedirect, async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', loginCheck, async (ctx, next) => {
    // const session = ctx.session;
    // if (session.viewNum == null) {
    //     session.viewNum = 0;
    // }
    // session.viewNum++;

    ctx.body = {
        title: 'koa2 json',
        // viewNum: session.viewNum,
    };
});

module.exports = router;
