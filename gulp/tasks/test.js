'use strict';

var gulp = require('gulp');

gulp.task('test', ['jshint', 'jscs', 'scsslint', 'karma']);
