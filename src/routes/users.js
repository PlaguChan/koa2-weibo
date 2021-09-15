const router = require('koa-router')();

router.prefix('/users');
// 前缀

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response';
});

// post，用postman模拟发送请求
router.post('/login', async (cxt, next) => {
    const { userName, password } = cxt.request.body; // 请求的body
    cxt.body = {
        // 响应的body
        title: 'mypage',
        userName,
        password,
    };
});

module.exports = router;
