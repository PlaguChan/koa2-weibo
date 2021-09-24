/**
 * @description utils api 路由
 */
const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks');
const koaFrom = require('formidable-upload-koa'); // 创建一个临时文件夹存储上传的文件
const { saveFile } = require('../../controller/utils');

router.prefix('/api/utils');

// 登录验证->上传图片->api
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    const file = ctx.req.files['file'];
    if (!file) {
        return; // 文件不存在时
    }
    const { size, path, name, type } = file;
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path,
    });
});

module.exports = router;
