'use strict';

var gulp = require('gulp');
var handleErrors = require('../handleErrors');
var config = require('../config').javascript;
var usenotifier = require('../config').usenotifier;
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');

gulp.task('jscs', function() {
    gulp.src(config.watch)
    .pipe(cache('jscs'))
    .pipe(jscs({
        configPath: './jscsrc'
    }))
});
