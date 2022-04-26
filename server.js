/*
 * @Author: your name
 * @Date: 2022-04-24 16:16:45
 * @LastEditTime: 2022-04-26 17:12:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \express-jwt-study\server.js
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
var morgan = require('morgan');

app.use(morgan('short'));
app.use(bodyParser.json());

require("./routes")(app);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Connection has been established successfully.')
    app.listen(3000, () => console.log(`Server has been started on port 3000`))
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })