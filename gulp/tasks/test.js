/**
 * Runs all configured linters and tests.
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('test', function(cb) {
    runSequence(
        'clean-reports',
        ['scsslint', 'eslint'],
        'karma',
        cb
    )
});
