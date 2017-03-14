'use strict';

import gulp from 'gulp';
import del from 'del';       
import zip from 'gulp-zip';
import sftp from 'gulp-sftp';                   // 文件上传到远程服务器插件

const BUILD_PATH = 'build';						// 编译文件
const DIST_PATH = 'dist';						// 目的地文件
const FILENAME = 'xxx-xxx-xx';
const DEV_SERVER = "xxx.xxx.xxx.xxx";			// DEV静态资源服务器
const TEST_SERVER = "xxx.xxx.xxx.xxx";			// TEST静态资源服务器
const USER = "xxx";						       	// 静态资源服务器用户名
const PASSWORD = "xxxxx";		       			// 静态资源服务器密码
const DEV_RELEASE_PATH = "/usr/local/static"; 	// DEV静态资源存放到服务器的路径
const TEST_RELEASE_PATH = "/usr/local/static"; 	// TEST静态资源存放到服务器的路径
const TIMEOUT = 60000;                          // 请求服务器超时时间, 1分钟.

// 清除dist目录
gulp.task('clean', () => {
    return del(['dist']);
});
// 文件打包
gulp.task('package', ['clean'], () => {
	return gulp.src(`${BUILD_PATH}/**`)
		.pipe(gulp.dest(`${DIST_PATH}/${FILENAME}/`))
});
// 将静态资源压缩为zip格式
gulp.task('zip', ['package'], () => {
	return gulp.src(`${DIST_PATH}/**`, {base: `${DIST_PATH}/`})
		       .pipe(zip(`${FILENAME}.zip`))
		  	   .pipe(gulp.dest(DIST_PATH));
});
// 将静态资源发布到 dev 服务器
gulp.task('release_dev', ['package'], () => {
	return gulp.src([`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`]).pipe(sftp({
		host: DEV_SERVER,
		user: USER,
		pass: PASSWORD,
		remotePath: DEV_RELEASE_PATH,
		timeout: TIMEOUT
	}));
});
// 将静态资源发布到 test 服务器
gulp.task('release_test', ['zip'], () => {
	return gulp.src([`${DIST_PATH}/*.zip`]).pipe(sftp({
		host: TEST_SERVER,
		user: USER,
		pass: PASSWORD,
		remotePath: TEST_RELEASE_PATH,
		timeout: TIMEOUT
	}));
});
// 同时发布到DEV和TEST服务器
gulp.task('release_all', ['release_dev', 'release_test']);

gulp.task('default', ['release_all']);