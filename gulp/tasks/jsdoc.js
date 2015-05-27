/**
 * Generate JSDOC from source files
 */
'use strict';

var gulp = require('gulp');
var config = require('../config');
var shell = require('gulp-shell');
var handleErrors = require('../handleErrors');

gulp.task('jsdoc', shell.task([
    './node_modules/jsdoc/jsdoc.js public/js -r -d ' + config.documentation.subDir
]));
