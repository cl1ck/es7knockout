/**
 * Run compiler tasks for development
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('precompile-dev', function(cb) {
    runSequence(
        'clean-dev',
        ['html-dev', 'sass-dev', 'styleguide'],
        cb
    );
});
