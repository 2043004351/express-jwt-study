# 首先拉取代码
###
 # @Author: wsq 123123
 # @Date: 2022-06-21 10:44:31
 # @LastEditors: wsq 123123
 # @LastEditTime: 2022-06-21 10:46:13
 # @FilePath: \express-jwt-study\scripts\deploy.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
git pull
# 更新npm包
npm install
# pm2重启服务
pm2 restart jwt