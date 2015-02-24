'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('javascript', function(cb) {
    runSequence(['jshint', 'jscs', 'karma'], 'jspm', cb);
});
