/*
 * @Author: your name
 * @Date: 2022-04-24 17:51:07
 * @LastEditTime: 2022-04-26 17:19:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\controllers\UserController.js
 */
// 操作Sequelize用户表
const { user, permission: permissionDB } = require("../models");
const { generateToken } = require("../authorization");
module.exports = {
  register: async (req, res) => {
    const { name, email, password, permission = ['user'] } = req.body;
    try {
      const userInfo = await user.findOne({
        where: {
          email,
        },
      });
      if (userInfo) {
        return res.status(400).send({
          message: "该邮箱已被注册",
        });
      }
      const data = await user.create({
        name,
        email,
        password,
        permission
      });
      res.send({
        code: 200,
        message: "注册成功",
      });
    } catch (error) {
      res.send({
        code: 500,
        message: "注册失败",
      });
    }
  },
  // 登录
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userInfo = await user.findOne({
        where: {
          email,
        },
      });
      // 判断用户是否存在 密码是否正确
      if (!userInfo || !userInfo.checkPassword(password)) {
        return res.status(400).send({
          message: "用户名或密码错误",
        });
      }
      res.send({
        code: 200,
        message: "登录成功",
        data: generateToken({ userInfo }),
      });
    } catch (error) {
      res.send({
        code: 500,
        message: "登录失败",
      });
    }
  },
  // 更新用户信息
  update: async (req, res) => {
    const { id } = req.user.userInfo;
    const { name, email, password, permission } = req.body;
    try {
      const userInfo = await user.findOne({
        where: {
          id,
        },
      });
      if (!userInfo) {
        return res.status(400).send({
          message: "用户不存在",
        });
      }
      console.log(permission.toString());
      const data = await user.update(
        {
          name,
          email,
          password,
          permission: permission.toString() || ''
        },
        {
          where: {
            id,
          },
        }
      );
      res.send({
        code: 200,
        message: "更新成功",
      });
    } catch (error) {
      console.log(1)
      res.send({
        code: 500,
        message: "更新失败",
      });
    }
  },
  // 获取用户信息
  getUserInfo: async (req, res) => {
    const { id } = req.user.userInfo;
    try {
      // 首先查询用户表 data = { id, name, email, permission }
      // 然后使用查询出来的id去查询权限表
      // 将查询出来的权限表的数据放到用户表中
      const userInfo = await user.findOne({
        where: {
          id,
        },
      });
      const permissionInfo = await permissionDB.findAll({
        where: {
          id: userInfo.permission.split(","),
        },
      });
      res.send({
        code: 200,
        message: "获取用户信息成功",
        userInfo: userInfo,
        permission: permissionInfo
      });
    } catch (error) {
      res.send({
        code: 500,
        message: "获取用户信息失败" + error,
      });
    }
  }
};
