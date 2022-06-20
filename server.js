/*
 * @Author: your name
 * @Date: 2022-04-24 16:16:45
 * @LastEditTime: 2022-06-20 16:47:33
 * @LastEditors: wsq 123123
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\server.js
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
var morgan = require("morgan");
const createHandler = require('github-webhook-handler')
let handler = createHandler({ path: '/webhook', secret: 'woshizz123' })

app.use(morgan("short"));
app.use(bodyParser.json());

require("./routes")(app);
handler.on("push", function (event) {
  console.log(
    "Received a push event for %s to %s",
    event.payload.repository.name,
    event.payload.ref
  );
});
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(3000, () => console.log(`Server has been started on port 3000`));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
