module.exports = {
  // 使用 env 关键字指定你想启用的环境
    "env": {
        "browser": true, // 浏览器环境
        "es6": true,
        // "node": true   node.js 环境
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    // 指定解析器选项
    "parserOptions": {
        "ecmaVersion": 2018, //es9
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};