/*
 * @Author: wsq 123123
 * @Date: 2022-06-21 10:24:58
 * @LastEditors: wsq 123123
 * @LastEditTime: 2022-06-28 10:36:52
 * @FilePath: \express-jwt-study\controllers\webhookController.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const crypto = require("crypto");
const shell = require("child_process");
const { resolve } = require("path");

// 判断token是否存在
const isTokenExist = async (sha256, body) => {
  if (sha256) {
    return false;
  }
  const hmacSha256 = crypto
    .createHmac("sha256", "woshizz123")
    .update(body)
    .digest("hex");
  if (sha256 != hmacSha256) {
    return false;
  }
  return true;
};

module.exports = {
  // 验证token
  verifyToken: async (req, res) => {
    const sha256 = req.headers["x-hub-signature"].split("=")[1];
    if (isTokenExist(sha256, JSON.stringify(req.body))) {
      const { ref } = req.body;
      if (ref.indexOf("develop") > -1) {
        // 首先设置deploy.sh权限
        shell.exec(`chmod +x ${resolve(__dirname, "../deploy.sh")}`);
        shell.exec(`sh ${resolve(__dirname, "../scripts/deploy.sh")}`);
        res.send("success");
      }
      res.send("success");
    } else {
      res.status(401).send({
        message: "请先登录",
      });
    }
  }
};
