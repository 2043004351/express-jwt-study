/*
 * @Author: your name
 * @Date: 2022-04-24 17:47:30
 * @LastEditTime: 2022-06-21 10:19:48
 * @LastEditors: wsq 123123
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\router.js
 */
const UserController = require("./controllers/UserController");
const PermissionController = require("./controllers/PermissionController");
const menuController = require("./controllers/MenuController");
// 引入express-jwt 解析token
const notToken = ["/register", "/login", "/webhook"];
const { verifyToken } = require("./authorization");
const crypto = require('crypto');

const qs = require("qs");
module.exports = (app) => {
  // express 中间件
  app.use((req, res, next) => {
    // 判断请求路径是否在notToken中
    if (notToken.includes(req.path)) {
      next();
    } else {
      // 解析token
      const token = req.headers.authorization;
      // console.log(token, "token");
      // 判断token是否存在
      if (!token) {
        return res.status(401).send({
          message: "请先登录",
        });
      }
      // 解析token
      const data = verifyToken(token);
      
      // 将id存入req中
      req.user = data;
      req.body = qs.parse(req.body);
      next();
    }
  });
  app.post("/webhook", async (req, res) => {
    const sha256 = req.headers['x-hub-signature'].spilt('=')[1];
    const payload = JSON.stringify(req.body);
    // console.log(payload, "payload");
    const hmac = crypto.createHmac('sha256', 'woshizz123').update(payload).digest('hex');
    // let sha1 = crypto.HmacSHA256("sha1", "woshizz123").update(payload).toString();
    res.send(hmac || "ok");
  })
  app.post("/register", UserController.register); // 用户注册
  app.post("/login", UserController.login); // 用户登录
  // 更新用户信息
  app.put("/user/update", UserController.update);
  // 获取用户信息
  app.get("/user/info", UserController.getUserInfo);
  // 权限 新增
  app.post("/permission/add", PermissionController.create);
  // 权限 删除
  app.post("/permission/delete", PermissionController.delete);
  // 权限 更新
  //   app.post("/permission/update", PermissionController.update);
  // 权限 查询
  app.post("/permission/query", PermissionController.findAll);
  // 获取菜单
  app.get("/menu/get", menuController.getAllMenu);
  // 删除菜单
  app.post("/menu/delete", menuController.deleteMenu);
  // 新增菜单
  app.post("/menu/add", menuController.createMenu);
  // 更新菜单
  app.post("/menu/update", menuController.updateMenu);
};
