/*
 * @Author: your name
 * @Date: 2022-04-24 17:52:49
 * @LastEditTime: 2022-04-26 18:41:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\config\index.js
 */
const path = require("path");
module.exports = {
  db: {
    options: {
      host: "localhost",
      dialect: "mysql",
    },
    // 数据库名称
    database: "express_jwt",
    // 用户名
    username: "express_jwt",
    // 密码
    password: "G8W8MjwXjMZhW4a7",
    define: {
      freezeTableName: true,
    },
  },
};
