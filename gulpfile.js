var gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    nodemon = require("gulp-nodemon"),
    uglify = require('gulp-uglify'),
    html = require('gulp-htmlmin'),
    bowerfile = require('main-bower-files'),
    settings = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };

gulp.task('clean', function (cb) {
    return del(path.join('dist'), cb);
});
gulp.task('lib', function () {
    return gulp.src(bowerfile())
        .pipe(uglify())
        .pipe(gulp.dest(path.join('dist', 'lib')));
});
gulp.task('config', function () {
    return gulp.src(path.join('resources', 'config', '*'))
        .pipe(gulp.dest(path.join('dist', 'config')));
});
gulp.task('module', function () {
    return gulp.src(path.join('resources', 'module', '*'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join('dist', 'module')));
});
gulp.task('html', function () {
    return gulp.src(path.join('resources', 'views', '*'))
        .pipe(html(settings))
        .pipe(gulp.dest(path.join('dist', 'views')));
});
gulp.task('default', ['clean', 'lib', 'config', 'module', 'html'], function () {
    return gulp.src(path.join('resources', 'index.html'))
        .pipe(html(settings))
        .pipe(gulp.dest(path.join('dist')));
});
gulp.task('serve', ['default'], function () {
    gulp.watch(path.join('resources', 'module', '**.js'), ['module']);
    gulp.watch(path.join('resources', 'views', '**.html'), ['html']);
    gulp.watch(path.join('resources', 'config', '**.js'), ['config']);
    return nodemon({
        script: 'gulp-serve.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    });
});