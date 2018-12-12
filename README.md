# Scaffolding Project ES6 项目

### 项目介绍
用于开发单页应用的脚手架, 基于ES6, 可轻松扩展为 React 项目.

### 项目依赖
```
node:    v8.x.x
webpack: v4.x.x
eslint:  v5.x.x
babel:   v7.x.x
gulp:    v4.x.x
```

### 安装
下载项目后在项目根目录执行
```  
npm install
```
### FAQ
1. 如果使用 cnpm install 安装模块, 在启动服务时报错(比如提示模块未找到), 尝试删除 node_modules 目录, 并使用 npm i 重新安装.
2. 如遇全局模块问题, 可能需要重新安装全局模块, 安装前请先卸载已有版本, 然后执行如下命令:
```
npm install -g webpack@4.19.0 webpack-dev-server@3.1.8 eslint@5.6.0 babel-core@7.0.1 gulp@4.0.0
```

### React扩展
1. 安装 babel 插件
```
npm i -D @babel/preset-react
npm i -S react react-dom
```
2. 修改 babel.config.js 配置, 解开2处 '@babel/preset-react' 注释即可.

### 快速启动
进入bin目录:  
- window 下执行 startup-mock.bat
- linux 下执行 startup-mock.sh

浏览器输入: http://localhost:8080  

### 服务配置
web服务端口默认为8080.  
mock服务端口默认为3001.  
proxy配置HTTP请求代理到的服务器.
如遇端口冲突, 可以在package.json > devServer中修改.

### 目录结构
```
bin                                         // 可执行命令目录.
|-build-dev.bat                             // 将src目录中的源码通过 webpack.config.dev.babel.js 编译到build目录.
|-build-prod.bat                            // 将src目录中的源码通过 webpack.config.prod.babel.js 编译到build目录.
|-deploy-all.bat                            // 将代码发布到开发和测试服务器, 需在package.json中配置deploy相关信息.
|-deploy-dev.bat                            // 将代码发布到开发服务器, 需在package.json中配置deploy.dev相关信息.
|-deploy-test.bat                           // 将代码发布到测试服务器, 需在package.json中配置deploy.test相关信息.
|-package.bat                               // 将src目录中的源码通过生产环境配置打包到dist目录并生成zip文件供发版使用.
|-lint.bat                                  // 执行eslint生产环境代码校验.
|-startup.bat                               // 启动开发环境web服务(window)
|-startup.sh                                // 启动开发环境web服务(linux)
|-mock.bat                                  // 启动开发环境mock服务(window)
|-mock.sh                                   // 启动开发环境mock服务(linux)
|-startup-mock.bat                          // 同时启动开发环境web和mock服务(window)
|-startup-mock.sh                           // 同时启动开发环境web和mock服务(linux)
|-test.bat                                  // 执行jest单元测试(window)
|-test.sh                                   // 执行jest单元测试(linux)
build                                       // 代码编译后生成的临时目录
dist                                        // 代码打包后生成的临时目录
mock-server                                 // mock服务目录
|-data                                      // mock数据存放目录
|-server.js                                 // mock服务配置
src                                         // 项目源码目录
|-components                                // 功能组件目录
    |-poppupBox                             // 新增resources弹窗组件
        |-PoppupBox.js                      // 组件js文件, 文件首字母大写, 驼峰标识, 代码采用ES6风格编码.
        |-poppupBox.css                     // 组件引用的css文件, 文件首字母小写, 驼峰标识.
    |-searchResult                          // 搜索列表组件
        |-SearchResult.js                   // 组件js文件, 文件首字母大写, 驼峰标识, 代码采用ES6风格编码.
        |-searchResult.css                  // 组件引用的css文件, 文件首字母小写, 驼峰标识.
    ...
|-config                                    // 生产环境配置文件目录
    |-settings.js                           // 项目生产环境配置文件
|-constants                                 // 常量目录
    |-common.js                             // 存放一些通用常量
|-containers                                // 容器组件目录(容器组件就像一个页面, 将各种功能组件组合在一起形成).
    |-home                                  // 首页容器组件
        |-Home.js                           // 组件js文件, 文件首字母大写, 驼峰标识, 代码采用ES6风格编码.
        |-home.css                          // 组件引用的css文件, 文件首字母小写, 驼峰标识.
    ...
|-styles                                    // 通用样式目录
    |-main.css                              // 全局css文件
    |-fonts.css                             // 字体样式和字体图标css文件
|-images                                    // 公共图片存放目录
|-services                                  // 后台接口服务目录, 所有服务端数据请求都封装在这里, 并统一调用HttpRequest对象请求后台接口, 方便数据封装, 接口重用.
    |-agent.js                              // agent接口请求文件, 对应请求URL的模块名, 如: /user/add, 则文件应该命名为user.js
|-utils                                     // 常用工具
    |-httpRequest.js                        // 封装了后台数据请求, 统一从此对象请求后台数据, 返回一个Promise. 该对象应在services目录的文件中使用, 不应直接在页面上调用.
    |-util.js                               // 一些常用工具方法.
|-index.js                                  // 入口js文件.
|-template.html                             // 页面模板文件.
test                                        // 测试代码目录, 目录结构同src
|-components
    ...
.eslintignore                               // eslint忽略校验配置文件.
.eslintrc.json                              // eslint开发环境代码校验配置文件.
.eslintrc.prod.json                         // eslint生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore                                  // git忽略提交配置文件.
package.json                                // npm配置文件.
README.md                                   // 项目开发文档.
babel.config.js                             // babel配置文件.
postcss.config.js                           // postcss插件配置文件.
gulpfile.babel.js                           // 项目打包, 发布脚本.
webpack.config.base.js                      // webpack开发, 生产环境公用部分.
webpack.config.dev.babel.js                 // webpack开发环境配置文件.
webpack.config.prod.babel.js                // webpack生产环境配置文件.
```

### 启动服务
1. web服务  
运行 /bin/startup.bat  
浏览器访问 localhost:8080 即可,  
可在 package.json > devServer > local 配置web服务的端口.
2. web服务 + mock服务  
运行 /bin/startup-mock.bat (无需再运行 /bin/server.bat).  
浏览器访问 localhost:8080 即可,  
可在 package.json > devServer > mock 配置mock服务的端口.

### 项目打包
1. 在 package.json > project 中配置项目相关信息, 详见下方说明.
2. 运行 /bin/package.bat或.sh, 会在 /dist 目录生成打包后的项目文件夹和压缩后的zip文件, 供发版使用.
```
"project": {
    "title": "My App",              // index.html的默认title
    "rootPath": "root",             // 项目的根路径, 如果配置改属性, 本地调试时需加上此根路径(localhost:8080/root), 用于在多个单页系统中根据根路径来映射项目静态资源, 默认为空.
    "packageName": "www.myapp.com"  // dist目录打包生成出的项目包名.
},
```

### 自动发布流程
1. 在package.json > deploy 中配置发布服务器信息.
```
"deploy": {             // 发布信息配置
    "dev": {            // 发布到开发服务器
        "host":         // 主机IP
        "port":         // 端口
        "user":         // 服务器登陆账号
        "pass":         // 服务器登陆密码
        "zip":          // 是否以 zip 包的形式发布, 如果为 true 则发布的是个 zip 包, false 发布的是文件夹
        "timeout":      // 服务器连接超时时间
        "remotePath":   // 发布到服务器上的位置
    }
    "test": {
        同上...
    }
}
```
2. 运行 /bin/deploy-dev.bat, 发布到 dev 服务器.   
3. 运行 /bin/deploy-test.bat, 发布到 test 服务器.    
4. 运行 /bin/deploy-all.bat, 同时发布到 dev 和 test 服务器.

### linux环境配置(RHEL, CentOS or Fedora)
1. 安装node, 执行:
```
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
```
可选安装, 构建工具:
```
sudo yum install gcc-c++ make
```
2. 从git下载项目源码.
3. 为项目授权, 执行
```
chmod -R 777 xxxxxx/
```
4. 进入项目根目录, 执行  
```
npm i
```
5. 执行/bin目录下./package.sh文件
参考
https://nodejs.org/en/download/package-manager/

### linux下常见问题
1. 切换用户后找不到 node 或 npm 命令
查看echo $PATH 环境变量, 将 node 和 npm 快捷方式加入到其中一个bin目录中.
2. 执行 npm install 提示: Cannot find module '/root/..../node_modules/node-sass/scripts/install.js'
尽量不要使用 sudo 执行 npm, 如果必须使用, 需先安装
```
sudo npm install --unsafe-perm -g node-sass
```
参考
https://github.com/sass/node-sass/blob/master/TROUBLESHOOTING.md