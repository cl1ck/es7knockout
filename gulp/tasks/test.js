/**
 * Runs all configured linters and tests.
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('test', function(cb) {
    if (!config.runTestsOnBuild) {
        return cb();
    }

    runSequence(
        'scsslint',
        'jshint',
        'karma',
        cb
    )
});
