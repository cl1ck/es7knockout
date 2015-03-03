/**
 * Minimize / optimize source images for production.
 */
'use strict';

var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config');

gulp.task('images-build', function() {
    return gulp.src(config.srcDir + config.images.subDir + config.images.files)
    .pipe(imagemin(config.images.settings))
    .pipe(gulp.dest(config.buildTargetDir + config.images.subDir));
});
