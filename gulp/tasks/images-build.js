/**
 * Minimize / optimize source images for production.
 */
'use strict';

var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config');
var handleErrors    = require('../handleErrors');

gulp.task('images-build', function() {
    return gulp.src(config.srcDir + config.images.subDir + config.images.files)
    .pipe(imagemin(config.images.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.buildTargetDir + config.images.subDir));
});
