/*
 * @Author: your name
 * @Date: 2022-04-26 17:19:45
 * @LastEditTime: 2022-04-28 17:05:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\controllers\menuController.js
 */
const { menu } = require("../models");
const { Op } = require("sequelize");
module.exports = {
    // 获取所有菜单 function(req, res)
    async getAllMenu(req, res) {
        try {
            // 首先获取所有菜单
            const allMenu = await menu.findAll({
                order: [["sort", "ASC"]],
            });
            let parentMenu = allMenu.filter((item) => item.parentId === 0);
            parentMenu = parentMenu.map((item) => {
                const children = allMenu.filter((child) => child.parentId === item.id);
                return {
                    ...item.dataValues,
                    children: children
                };
            });
            res.send({
                code: 200,
                message: "获取菜单成功",
                data:allMenu,
                parentMenu,
            });
        } catch (error) {
            res.send({
                code: 500,
                message: "获取菜单失败"+error
            });
        }
    },
    // 新增菜单
    async createMenu(req, res) {
        const { name, icon, path, sort, parentId } = req.body;
        const data = await menu.create({
            name,
            icon,
            path,
            sort,
            parentId,
        });
        res.send({
            code: 200,
            message: "新增菜单成功",
        });
    },
    // 修改菜单
    async updateMenu(req, res) {
        const { id, name, icon, path, sort, parentId } = req.body;
        const data = await menu.update({
            name,
            icon,
            path,
            sort,
            parentId,
        }, {
            where: {
                id,
            },
        });
        res.send({
            code: 200,
            message: "修改菜单成功",
        });
    },
    // 删除菜单
    async deleteMenu(req, res) {
        const { id } = req.body;
        const data = await menu.destroy({
            where: {
                id,
            },
        });
        res.send({
            code: 200,
            message: "删除菜单成功",
        });
    }
}