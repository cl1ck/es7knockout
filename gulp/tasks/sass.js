var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    gulpif       = require('gulp-if'),
    autoprefixer = require('../pipes/autoprefixer'),
    reload       = require('../pipes/reload'),
    scsslint     = require('../pipes/scsslint'),
    handleErrors = require('../handleErrors'),
    config       = require('../config').sass;

gulp.task('sass', ['images'], function() {
    return gulp.src(config.src)
        .pipe(gulpif(config.scsslint, scsslint()))
        .on('error', handleErrors)
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.dest))
        .pipe(reload());
});
