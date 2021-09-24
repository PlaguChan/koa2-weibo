/**
 * @description user表模型测试
 */

const { User } = require('../../src/db/model/index');

//模型不涉及异步，可以不加async
test('userModel测试', () => {
    const user = User.build({
        // build 会构建一个内存的 User 实例，但不会提交到数据库中
        userName: 'zhangsan',
        password: 'p123123',
        nickName: '张三',
        // gender: 1,
        picture: '/xxx.png',
        city: '北京',
    });
    // 验证各个属性
    expect(user.userName).toBe('zhangsan');
    expect(user.password).toBe('p123123');
    expect(user.nickName).toBe('张三');
    expect(user.gender).toBe(3); // 测试 gender 默认值
    expect(user.picture).toBe('/xxx.png');
    expect(user.city).toBe('北京');
});
