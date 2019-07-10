'use strict';
import gulp from 'gulp';
import del from 'del';
import zip from 'gulp-zip';
import sftp from 'gulp-sftp-up4';
import { project, deploy } from './package.json';
import { execSync } from 'child_process';

const BUILD_PATH = 'build';                    // 编译文件
const DIST_PATH = 'dist';                      // 目的地文件
const { packageName } = project;               // 打包生成的文件名
const { dev, test } = deploy;

// 清除dist目录
gulp.task('clean', () => {
    return del([DIST_PATH]);
});
// 文件打包
gulp.task('dist', gulp.series('clean', () => {
    return gulp.src(`${BUILD_PATH}/**`)
        .pipe(gulp.dest(`${DIST_PATH}/${packageName}/`));
}));
// 将静态资源压缩为zip格式
gulp.task('zip', gulp.series('dist', () => {
    return gulp.src([`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`], { base: `${DIST_PATH}/` })
        .pipe(zip(`${packageName}.zip`))
        .pipe(gulp.dest(DIST_PATH));
}));
// 将静态资源发布到 dev 服务器
gulp.task('deploy-dev', () => {
    return gulp.src(dev.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
        .pipe(sftp(dev));
});
// 将静态资源发布到 test 服务器
gulp.task('deploy-test', () => {
    return gulp.src(test.zip ? [`${DIST_PATH}/*.zip`] : [`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`])
        .pipe(sftp(test));
});
// 同时部署到开发和测试服务器
gulp.task('deploy-all', gulp.parallel('deploy-dev', 'deploy-test'));

gulp.task('git-push', (done) => {
    execSync('git add -A :/');
    execSync('git commit -m "quick commit"');
    execSync('git push');
    done();
});
