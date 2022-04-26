/*
 * @Author: your name
 * @Date: 2022-04-25 14:34:38
 * @LastEditTime: 2022-04-25 15:58:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\authorization.js
 */
const jwt = require("jsonwebtoken");
module.exports = {
  // 生成token
  generateToken(payload) {
    console.log(payload);
    return jwt.sign(payload, "miss_you", { expiresIn: "30day" });
  },
  // 解析token
  verifyToken(token) {
    // token 拆分
    const [bearer, tokenStr] = token.split(" ");
    return jwt.verify(tokenStr, "miss_you");
  },
};
