'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence(
        'clean-build',
        ['html-build', 'sass-build', 'styleguide'],
        cb
    );
});
