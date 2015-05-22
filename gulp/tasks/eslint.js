/**
 * Will run ESLint on all js source files.
 */
'use strict';

var gulp            = require('gulp');
var config          = require('../config');
var eslint          = require('gulp-eslint');
var notify          = require('gulp-notify');
var gulpif          = require('gulp-if');
var handleErrors    = require('../handleErrors');
var fs              = require('fs');

var writeCheckstyle = function(xml) {
    fs.writeFile(config.javascript.esLintOutput, xml, function() {
        // ignore error
    });
};

gulp.task('eslint', function() {
    return gulp.src(config.srcDir + config.javascript.subDir + config.javascript.files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.format('checkstyle', writeCheckstyle))
        .on('error', handleErrors);
});
