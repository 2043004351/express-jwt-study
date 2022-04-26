/*
 * @Author: your name
 * @Date: 2022-04-24 18:11:51
 * @LastEditTime: 2022-04-26 16:51:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\models\User.js
 */
const Sequelize = require("sequelize");
const { MD5 } = require("crypto-js");
module.exports = (sequelize) => {
  class User extends Sequelize.Model {
    // 验证密码
    checkPassword(password) {
      return MD5(password).toString() === this.password;
    }
  }
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permission: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "user",
      // 密码加密
      hooks: {
        beforeCreate: (user) => {
          user.password = MD5(user.password).toString();
        },
      },
    }
  );
  return User;
};
