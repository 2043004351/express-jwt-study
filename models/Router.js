/*
 * @Author: your name
 * @Date: 2022-04-26 15:50:15
 * @LastEditTime: 2022-04-26 16:01:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\models\router.js
 */
const Sequelize = require("sequelize");
module.exports = (sequelize) => {
    // 菜单管理
    class Menu extends Sequelize.Model {}
    Menu.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            // 菜单名称
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // 菜单描述
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // 菜单路由
            route: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // 菜单图标
            icon: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // 菜单父级id
            parentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            // 菜单排序
            sort: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            // 菜单状态
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "menu",
        }
    );
    return Menu;
}
