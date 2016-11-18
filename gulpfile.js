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
    minifier = require('gulp-uglify/minifier'),
    uglify = require('uglify-js'),
    html = require('gulp-htmlmin'),
    string = require('gulp-inject-string'),
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
    },
    jsOptions = {
        compress: true,
        mangle: false,//ie8不支持
        preserveComments: false
    };

var ENV = process.argv[process.argv.length - 1] == 'serve' ? 'serve' : 'dist',
    ROOT = 'resources';

gulp.task('clean', function () {
    return del.sync([path.join('serve'), path.join('dist')]);
});
gulp.task('lib', function () {
    return gulp.src(bowerfile())
        .pipe(gulp.dest(path.join(ENV, 'lib')));
});
gulp.task('config', function () {
    return gulp.src(path.join(ROOT, 'config', '*'))
        .pipe(gulpif(ENV != 'dist', string.after("/** @Inject:mock */", "var mock = require('mock');")))
        .pipe(gulp.dest(path.join(ENV, 'config')));
});
gulp.task('app', function () {
    return gulp.src(path.join(ROOT, 'app', '*', '**.js'))
        .pipe(gulpif(ENV != 'dist', minifier(jsOptions, uglify)))
        .pipe(gulp.dest(path.join(ENV, 'app')));
});
gulp.task('html', function () {
    return gulp.src(path.join(ROOT, 'app', '*', '**.html'))
        .pipe(gulpif(ENV == 'dist', html(settings)))
        .pipe(gulp.dest(path.join(ENV, 'app')));
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
gulp.task('inject', ['index'], function () {
    return gulp.src(path.join(ENV, 'index.html'))
        .pipe(inject(gulp.src([path.join(ENV, 'css', '*.css')], {read: false}), {relative: true}))
        .pipe(gulpif(ENV != 'dist', string.after("/** @Inject:mock-define */", ",'mock':'http://121.43.161.157:8084/rap.plugin.js?projectId=3'")))
        .pipe(gulpif(ENV != 'dist', string.after("/** @Inject:mock-dependencies */", ",'mock':{deps: ['jquery']}")))
        .pipe(string.after("/** @Inject:version */", ",'urlArgs':'v=" + new Date().getTime() + "'"))
        .pipe(gulpif(ENV == 'dist', html(settings)))
        .pipe(gulp.dest(path.join(ENV)));
});
gulp.task('default', ['clean', 'image', 'lib', 'config', 'app', 'less', 'html', 'inject'], function () {
    return gulp.src(path.join(ENV, '**'))
        .pipe(gulpif(ENV == 'dist', size({title: 'compress', showFiles: true})));
});
gulp.task('serve', ['default'], function () {
    gulp.watch(path.join(ROOT, 'images', '**'), ['image']);
    gulp.watch(path.join(ROOT, 'app', '*', '**.js'), ['app']);
    gulp.watch(path.join(ROOT, 'app', '*', '**.html'), ['html']);
    gulp.watch(path.join(ROOT, 'index.html'), ['inject']);
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
