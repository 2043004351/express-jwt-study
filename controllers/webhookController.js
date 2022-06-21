/*
 * @Author: wsq 123123
 * @Date: 2022-06-21 10:24:58
 * @LastEditors: wsq 123123
 * @LastEditTime: 2022-06-21 10:26:19
 * @FilePath: \express-jwt-study\controllers\webhookController.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const crypto = require("crypto");

module.exports = {
  // 验证token
  async verifyToken(req, res) {
    const sha256 = req.headers["x-hub-signature"].spilt("=")[1];
    if (sha256) {
      return res.status(401).send({
        message: "非法请求",
      });
    }
    const payload = JSON.stringify(req.body);
    const hmacSha256 = crypto
      .createHmac("sha256", "woshizz123")
      .update(payload)
      .digest("hex");
    if (sha256 !== hmacSha256) {
      return res.status(401).send({
        message: "非法请求",
      });
    }
  },
};
