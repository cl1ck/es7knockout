/**
 * Deletes the docs directory
 */
'use strict';

var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');
var fs      = require('fs');

gulp.task('clean-docs', function (cb) {
    del(config.documentation.subDir, function() {
        fs.mkdir(config.documentation.subDir, cb)
    });
});
