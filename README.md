### 开发环境
node: v6.9.5
webpack: v2.2.1
eslint: v3.17.1
react: v15.4.2
react-router: v3.0.2
mtui: 2.0.7

### 目录结构
```
bin							// 可执行命令目录
|-build.bat                 // 将src目录中的源码编译到build目录
|-package.bat               // 将编译后的代码打包到dist目录并生产zip文件
|-dev.bat					// 同上, 增加watch监听
|-eslint.bat				// 执行eslint生产环境代码校验
|-release-all.bat			// 将代码发布到开发和测试服务器
|-release-dev.bat			// 将代码发布到开发服务器
|-release-dev.bat			// 将代码发布到测试服务器
|-server.bat				// 启动开发服务器
|-server-mock.bat			// 启动mock服务器
build						// 代码编译后生成的临时目录
dist						// 代码打包后生成的临时目录
doc							// 项目文档目录
soft						// 开发工具
src 						// 项目源码目录
|-components				// 功能组件目录
	|-component1
		|-Component1.jsx 	// 组件文件, 采用JSX + ES6风格编码, 驼峰标识, 首字母大写
		|-component1.scss 	// 组件对应样式文件, 驼峰标识, 首字母小写
	...
|-constants					// 常量目录
    |-common.js             // 存放一些通用常量
    |-keyword.js            // 存放状态或类型相关的键值对常量, 如后台返回的type为1, status为2等
    |-validation.js         // 存放一些通用验证方法
|-css                       // 通用样式目录
    |-main.css 				// 全局css文件
|-data						// 静态数据目录, 包括mock数据
|-images					// 图片存放目录
|-layouts					// 布局组件存放目录, 如Header, Footer, Frame
|-routes					// 路由配置文件
|-services					// 后台接口服务目录, 所有服务端数据请求都封装在这里, 统一从这里请求后台接口, 方便数据封装, 接口重用.
    |-demo                  // 接口目录, 需对应RAP文档的模块名, 如诚信网 > 个人中心模块.
        |-demo.js           // 接口文件, 需对应RAP文档模块下的页面名, 如诚信网 > 个人中心模块 > 认证页面.
|-utils						// 常用工具
    |-formatter.js          // 一些数据格式转换工具, 如日期格式转换.
    |-higgsPromise.js       // 封装了后台数据请求, 统一从此接口调用后台数据, 返回一个Promise. 该对象应在services目录的文件中使用(具体参考demo.js), 不应直接在页面上调用.
    |-storage.js            // 封装了 localStorage 和 sessionStorage
    |-util.js               // 一些常用方法
|-views						// 页面容器组件目录, 该目录只存放用于展示的页面组件
    |-home
        |-Home.jsx          // 容器组件, 将所需的功能组件集合于该组件中, 用于页面展示, 如: Redux中的container.
        |-home.scss         // 容器组件样式
|-index.jsx					// 入口jsx文件
|-index.html				// 应用入口页面
test						// 测试代码目录
.babelrc					// babel配置文件
.eslintrc.json				// eslint代码校验配置文件, 开发规范参考 http://git.bbdservice.net/xuyao/doc.git 下的 /前端规范/frontStandard/index.html
.gitignore					// git忽略提交配置文件
node_modules.zip			// node插件包
package.json				// npm配置文件
README.md  					// 项目开发文档
webpack.config.js 			// webpack开发环境配置文件
webpack.config.prod.js 		// webpack生产环境配置文件
```

### 环境配置
1. 卸载现有node环境, 安装/soft/node-v6.9.5-x64.msi, 如是32位系统需自行下载相同版本.
2. 执行:
```
npm uninstall -g webpack webpack-dev-server eslint
npm i -g webpack@2.2.1 webpack-dev-server@2.3.0 eslint@3.15.0
```
3. 在项目根目录解压node_modules.zip
4. 执行:
```
npm install
```

### 本地调试
1. 启动本地调试服务器
    运行 /bin/server.bat
2. 启动mock服务器
    运行 /bin/server-mock.bat

### 发布流程
1. 开发和测试服务器同时发版:
    运行 /bin/release-all.bat   // 脚本会将代码编译到/dist目录, 并生成zip文件, 再发布到dev和test服务器.
2. 开发服务器单独发版:
    运行 /bin/release-dev.bat
3. 测试服务器单独发版:
    运行 /bin/release-test.bat
4. 线上发版:
    直接将生成的zip文件发送给运维的同事, 运维的同事在线上服务器文件对应目录解压即可.