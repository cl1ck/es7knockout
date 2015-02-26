'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence(
        'clean-build',
        ['jade', 'html-build', 'images-build', 'sass-build',
         'jspm:copyRuntime', 'javascript-build', 'styleguide'],
        cb
    );
});
