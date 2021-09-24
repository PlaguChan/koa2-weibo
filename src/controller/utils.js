/**
 * @description utils  controller业务逻辑实现
 */

const path = require('path');
const { SuccessModel, ErrorModel } = require('../model/Res');
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const fse = require('fs-extra');

// 存储目录
// __dirname：当前目录，..往上跳一级，连跳两级恰与src文件并列
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');
// 文件最大体积 1M(单位是比特)
const MIX_SIZE = 1024 * 1024 * 1024;

// 是否需要创建目录(判断目的地文件夹是否存在)
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH);
    }
});

/**
 * 保存文件，并输出文件的url
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {} size 文件大小
 * @param {string} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
    // 文件过大时，删除文件并返回错误
    if (size > MIX_SIZE) {
        await fse.remove(filePath);
        return new ErrorModel(uploadFileSizeFailInfo);
    }

    // 移动临时文件夹中的文件到存储文件的文件夹
    const fileName = Date.now() + '.' + name; // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName); // 目的地
    await fse.move(filePath, distFilePath);

    // 返回信息
    return new SuccessModel({
        url: '/' + fileName,
    });
}

module.exports = { saveFile };
