/*
 * @Author: wsq 123123
 * @Date: 2022-06-21 10:24:58
 * @LastEditors: wsq 123123
 * @LastEditTime: 2022-06-28 11:16:17
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
        // const chmod = shell.execSync(`chmod +x ${resolve(__dirname, "../scripts/deploy.sh")}`);
        shell.execFile("../scripts/deploy.sh", (error, stdout, stderr) => {
          if(error){
            res.send({
              msg: 500,
              msg: error
            })
          }else{
            res.send({
              code: 200,
              msg: "请求成功",
              data: stdout
            });
          }
        });
        return;
      } else {
        res.status(401).send({
          message: "请先登录",
        });
      }
    } else {
      res.status(401).send({
        message: "请先登录",
      });
    }
  },
};
