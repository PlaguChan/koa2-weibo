/**
 * login测试
 */

const server = require('./server');

test('login测试', async () => {
    const response = await server.post('/users/login').send({
        userName: 'lisi',
        password: 'mima',
    });
    expect(response.body.userName).toBe('lisi');
});
