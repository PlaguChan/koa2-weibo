const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    // console.log("before debugger");
    // debugger;
    // console.log("after debugger");
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        isMe: true,
        blogList: [
            {
                id: 0,
                name: 'zhangsan',
            },
            {
                id: 1,
                name: 'lisi',
            },
            {
                id: 2,
                name: 'wangwu',
            },
        ],
    });
});

// 动态路径参数:XXX和ctx.params
router.get('/myindex/:hhh/:hihihi', async (ctx, next) => {
    const { hhh, hihihi } = ctx.params;
    ctx.body = {
        hihihi,
        hhh,
    };
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
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
