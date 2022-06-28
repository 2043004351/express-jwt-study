###
 # @Author: wsq 123123
 # @Date: 2022-06-21 10:44:31
 # @LastEditors: wsq 123123
 # @LastEditTime: 2022-06-28 11:38:58
 # @FilePath: \express-jwt-study\scripts\deploy.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
logPath=./logs.log
logTime=`date +"%Y-%m-%d %H:%M:%S"`
# 进入根目录
cd /www/wwwroot/express-jwt-study
# 测试
echo "$logTime 进入首页" >> $logPath
# 首先拉取代码
git pull
# 测试
echo "$logTime git pull" >> $logPath
# 更新npm包
npm install
# 记录重启
echo "$logTime restart" >> $logPath
# pm2重启服务
pm2 restart jwt