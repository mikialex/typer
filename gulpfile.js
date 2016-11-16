// 载入外挂

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    order = require("gulp-order"),
    babel = require("gulp-babel"),
    es2015 = require("babel-preset-es2015");

var browserify = require('gulp-browserify');
var babelify = require("babelify");

var sourcemaps = require("gulp-sourcemaps");

// 样式
gulp.task('style', function() {
    // return gulp.src()
    //   .pipe(sass({ style: 'expanded', }))
    return sass('src/sass/*.scss', { //
            style: 'expanded',
            // loadPath: [paths.sassImportsPath]
        })
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // .pipe(gulp.dest('dist/styles'))
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(minifycss())
        .pipe(gulp.dest('static/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// 脚本
gulp.task('scripts', function() {
    return gulp.src('src/es6/*.js')
        //  .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        .pipe(concat('piScript.js'))
        .pipe(gulp.dest('static/js'))
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(uglify())
        // .pipe(gulp.dest('debug/static/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

//es6迁移至es5
gulp.task('es6to5', function() {
    return gulp.src('src/es6/*.js')
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(gulp.dest('src/es6/convertedES5'));
});

//指定入口文件进行打包
gulp.task('pack', ['es6to5'], function() {
    return gulp.src('src/es6/convertedes5/typer.js')
        .pipe(browserify())
        //.pipe(uglify())
        .pipe(gulp.dest('static/js'))
        .pipe(notify({
            message: 'packed'
        }));
});


// 清理
gulp.task('clean', function() {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {
            read: false
        })
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});


// watcher
gulp.task('watch', function() {

    // 看守所有.scss档
    gulp.watch('src/sass/*.scss', ['style']);

    // 看守所有.es6档
    gulp.watch('src/es6/*.js', ['pack']);

    // 建立即时重整伺服器
    livereload.listen();
    // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    gulp.watch(['static/**']).on('change', function(file) {
        livereload.changed(file.path);
        return notify({
            message: 'static changed'
        });
    });

});
