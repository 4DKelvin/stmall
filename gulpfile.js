var gulp = require('gulp'),
    path = require('path'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    minify = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    rev = require('gulp-rev'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    nodemon = require("gulp-nodemon"),
    uglify = require('gulp-uglify'),
    html = require('gulp-htmlmin'),
    bowerfile = require('main-bower-files'),
    less = require('gulp-less'),
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

var ENV = process.argv[process.argv.length - 1] == 'serve' ? 'serve' : 'dist',
    ROOT = 'resources';

gulp.task('clean', function () {
    return del.sync([path.join('serve'), path.join('dist')]);
});
gulp.task('lib', function () {
    return gulp.src(bowerfile())
        .pipe(gulpif(ENV == 'dist', uglify()))
        .pipe(gulp.dest(path.join(ENV, 'lib')));
});
gulp.task('config', function () {
    return gulp.src(path.join(ROOT, 'config', '*'))
        .pipe(gulp.dest(path.join(ENV, 'config')));
});
gulp.task('module', function () {
    return gulp.src(path.join(ROOT, 'module', '*'))
        .pipe(gulpif(ENV == 'dist', uglify()))
        .pipe(gulp.dest(path.join(ENV, 'module')));
});
gulp.task('html', function () {
    return gulp.src(path.join(ROOT, 'views', '*'))
        .pipe(gulpif(ENV == 'dist', html(settings)))
        .pipe(gulp.dest(path.join(ENV, 'views')));
});
gulp.task('image', function () {
    return gulp.src(path.join(ROOT, 'images', '**'))
        .pipe(gulp.dest(path.join(ENV, 'images')))
});
gulp.task('less', function () {
    return gulp.src(path.join(ROOT, 'stylesheets', '**.less'))
        .pipe(plumber())
        .pipe(less())
        .pipe(gulpif(ENV == 'dist', concat('pc.css')))
        .pipe(gulpif(ENV == 'dist', minify()))
        .pipe(gulpif(ENV == 'dist', rev()))
        .pipe(gulp.dest(path.join(ENV, 'css')));
});
gulp.task('index', function () {
    return gulp.src(path.join(ROOT, 'index.html'))
        .pipe(gulp.dest(path.join(ENV)));
});
gulp.task('default', ['clean', 'image', 'lib', 'config', 'module', 'less', 'html', 'index'], function () {
    gulp.src(path.join(ENV, 'index.html'))
        .pipe(inject(gulp.src([path.join(ENV, 'css', '*.css')], {read: false}), {relative: true}))
        .pipe(gulpif(ENV == 'dist', html(settings)))
        .pipe(gulp.dest(path.join(ENV)))
    return gulp.src(path.join(ENV, '**'))
        .pipe(gulpif(ENV == 'dist', size({title: 'compress', showFiles: true})))
});
gulp.task('serve', ['default'], function () {
    gulp.watch(path.join(ROOT, 'images', '**'), ['image']);
    gulp.watch(path.join(ROOT, 'module', '**.js'), ['module']);
    gulp.watch(path.join(ROOT, 'views', '**.html'), ['html']);
    gulp.watch(path.join(ROOT, 'index.html'), ['index']);
    gulp.watch(path.join(ROOT, 'config', '**.js'), ['config']);
    gulp.watch(path.join(ROOT, 'stylesheets', '**.less'), ['less']);
    return nodemon({
        script: 'gulp-serve.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    });
});
