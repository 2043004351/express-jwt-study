/*
 * @Author: your name
 * @Date: 2022-04-26 12:30:12
 * @LastEditTime: 2022-04-26 16:53:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\models\permission.js
 */
const Sequelize = require("sequelize");
module.exports = (sequelize) => {
  // 权限表
  class Permission extends Sequelize.Model {}
  Permission.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // 权限名称
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // 权限描述
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "permission",
    }
  );
  return Permission;
};
