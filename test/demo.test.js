/**
 * @description test-demo
 */

function sum(a, b) {
    return a + b;
}

test('demo1', () => {
    expect(sum(1, 2)).toBe(3);
});
