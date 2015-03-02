'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dist', function(cb) {
    runSequence(
        'clean-dist',
        'test',
        ['javascript-dist', 'sass-dist', 'images-dist', 'html-dist'],
        cb
    );
});
