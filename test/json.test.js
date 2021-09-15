/**
 * 测试路由/json
 */

const server = require('./server');

test('json测试', async () => {
    const response = await server.get('/json');
    expect(response.body).toEqual({
        title: 'koa2 json',
    });
    expect(response.body.title).toBe('koa2 json');
});
