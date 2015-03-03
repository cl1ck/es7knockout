'use strict';

var gulp            = require('gulp');
var styleguide      = require('sc5-styleguide');
var config          = require('../config').styleguide;
var sassconfig      = require('../config').sass;
var sass            = require('gulp-sass');
var handleErrors    = require('../handleErrors');

gulp.task('styleguide:generate', function() {
    return gulp.src(sassconfig.allSrc)
    .pipe(styleguide.generate({
        title: config.title,
        rootPath: config.dest,
        overviewPath: './README.md',
        server: false,
        port: config.port
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});

gulp.task('styleguide:applystyles', function() {
    return gulp.src(sassconfig.src)
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
