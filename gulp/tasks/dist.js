'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dist', function(cb) {
    runSequence(
        ['build', 'test'],
        'clean-dist',
        ['javascript-dist', 'css-dist', 'images-dist', 'html-dist'],
        cb
    );
});
