'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dist', function(cb) {
    runSequence(
        'test',
        'clean-dist',
        ['javascript-dist', 'sass-dist', 'images-dist', 'html-dist'],
        cb
    );
});
