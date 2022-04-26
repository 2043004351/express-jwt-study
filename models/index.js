/*
 * @Author: your name
 * @Date: 2022-04-24 18:07:30
 * @LastEditTime: 2022-04-25 10:48:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\model\index.js
 */
const path = require("path");
const fs = require("fs");
const config = require("../config");
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options,
  config.db.define
);
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    console.log(model)
    db[model.name] = model;
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;