/**
 * This will run the default task as defined in config.js
 */
'use strict';

var gulp    = require('gulp');
var config  = require('../config');

gulp.task('default', [config.defaultTask]);
