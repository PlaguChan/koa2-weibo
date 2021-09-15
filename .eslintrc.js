module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['google', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'no-unused-vars': 'warn', // 不能有声明后未被使用的变量或参数
        'no-multiple-empty-lines': [
            'error',
            {
                max: 2,
            },
        ], // 空行最多不能超过2行
        'no-with': 'error', // 禁用with
        'linebreak-style': [0, 'error', 'windows'], // 兼容windows行风格
        indent: ['error', 4, { SwitchCase: 1 }], // 缩进
        'new-cap': 'off', // 禁用函数名首字母必须大写位构造函数
        'max-len': ['error', 120],
        'comma-dangle': ['error', 'only-multiline'], // 多行对象末尾可以添加多余逗号
        'object-curly-spacing': ['error', 'always'], // 对象中的空格
        'prettier/prettier': 'off',
        'valid-jsdoc': 'off',
    },
};
