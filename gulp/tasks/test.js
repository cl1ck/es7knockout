'use strict';

var gulp            = require('gulp');
var runSequence     = require('run-sequence');
var runTestsOnDist  = require('../config').runTestsOnDist;

gulp.task('test', function(cb) {
    if (!runTestsOnDist) {
        cb();
        return;
    }

    runSequence(
        'scsslint',
        'jshint',
        'karma',
        cb
    )
});
