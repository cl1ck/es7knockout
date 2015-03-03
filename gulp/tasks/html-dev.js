/**
 * Compiles all EJS source files to the temp directory.
 * This task is setting the "production" variable for all ejs template to "false".
 */
'use strict';

var gulp            = require('gulp');
var config          = require('../config');
var ejs             = require('gulp-ejs');
var handleErrors    = require('../handleErrors');

gulp.task('html-dev', function() {
    return gulp.src(config.srcDir + config.html.subDir + config.html.files)
    .pipe(ejs({
        production: false
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.devTempDir + config.html.subDir));
});
