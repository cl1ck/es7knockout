/**
 * Runs all configured linters and tests.
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('test', function(cb) {
    runSequence(
        'scsslint',
        'jshint',
        'build',
        'karma',
        cb
    )
});
