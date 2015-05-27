/**
 * Styleguide generation.
 */
'use strict';

var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var config = require('../config');
var sass = require('gulp-sass');
var handleErrors = require('../handleErrors');

gulp.task('styleguide:generate', function() {
    return gulp.src(config.srcDir + config.sass.subdir + config.sass.watchFiles)
        .pipe(styleguide.generate({
            title: config.styleguide.title,
            rootPath: config.devTempDir + config.styleguide.subDir,
            overviewPath: './README.md',
            server: false,
            port: config.port
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.devTempDir + config.styleguide.subDir));
});

gulp.task('styleguide:applystyles', function() {
    return gulp.src(config.srcDir + config.sass.subdir + config.sass.files)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .on('error', handleErrors)
        .pipe(gulp.dest(config.devTempDir + config.styleguide.subDir));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
