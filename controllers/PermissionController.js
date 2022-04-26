/*
 * @Author: your name
 * @Date: 2022-04-26 14:24:07
 * @LastEditTime: 2022-04-26 15:49:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\controllers\PermissionController.js
 */
const { permission } = require("../models");

module.exports = {
    // 查询所有权限
    async findAll(req, res) {
        try {
            const data = await permission.findAll();
            res.send({
                code: 200,
                message: "查询成功",
                data,
            });
        } catch (error) {
            res.send({
                code: 500,
                message: "查询失败",
            });
        }
    },
    // 新增权限 node
    async create(req, res) {
        const { name, description } = req.body;
        // 判断权限是否存在
        const permissionInfo = await permission.findOne({
            where: {
                name,
            },
        });
        if (permissionInfo) {
            return res.status(400).send({
                message: "权限已存在",
            });
        }
        const data = await permission.create({
            name,
            description,
        });
        res.send({
            code: 200,
            message: "新增权限成功",
        });
    },
    // 删除权限
    async delete(req, res) {
        const { id } = req.body;
        const data = await permission.destroy({
            where: {
                id,
            },
        });
        res.send({
            code: 200,
            message: "删除权限成功",
        });
    }
};