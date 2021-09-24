/**
 * @description user登录测试
 */

const server = require('../server');

const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1,
};

//存储cookie(测试时绕过登陆验证，用cookie的值去找session的值)
let COOKIE = '';

//注册用户，返回结果应该成功
test('register', async () => {
    const res = await server.post('/api/user/register').send(testUser);
    expect(res.body.errno).toBe(0);
});

//注册时出现重名，返回结果应该失败
test('reRegister', async () => {
    const res = await server.post('/api/user/register').send(testUser);
    expect(res.body.errno).not.toBe(0);
});

//查询用户是否存在，之前第一步已经注册，应当成功
test('searchUser', async () => {
    const res = await server.post('/api/user/isExist').send({ userName });
    expect(res.body.errno).toBe(0);
});

//jsonschema检测，非法的用户名注册会失败,自己制造一些非法的用户名实验
test('validator', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123', //该项目的schema要求是用户名需要是字母下划线开头
        password: '2', //长度大于三
        gender: 'mail', //需要1，2，3
    });
    expect(res.body.errno).not.toBe(0);
});

// 登录
test('登录，应该成功', async () => {
    const res = await server.post('/api/user/login').send({
        userName,
        password,
    });
    expect(res.body.errno).toBe(0);

    // 获取 cookie(之后用set可以让jest绕过登陆检测)
    COOKIE = res.headers['set-cookie'].join(';');
});

// 修改基本信息
test('changeInformation', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '测试昵称',
            city: '测试城市',
            picture: '/test.png',
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 修改密码
test('changePassword', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`,
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 删除（删除需要登录验证，需要先登录后验证，故先删除后退出）
test('删除用户，应该成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 退出
test('退出登录应该成功', async () => {
    const res = await server.post('/api/user/logout').set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 再次查询用户，应该不存在
test('删除后再次查询，注册用户名不存在', async () => {
    const res = await server.post('/api/user/isExist').send({ userName });
    expect(res.body.errno).not.toBe(0);
});
