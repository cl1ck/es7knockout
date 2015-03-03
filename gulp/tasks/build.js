/**
 * Build task.
 * Runs all required tests then bundles your application for production.
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence(
        'clean-build',
        'test',
        ['javascript-build', 'sass-build', 'images-build', 'html-build'],
        cb
    );
});
