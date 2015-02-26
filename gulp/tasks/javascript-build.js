'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('javascript-build', function(cb) {
    runSequence(
        ['jshint', 'jscs'],
        'jspm',
        cb
    );
});
