/**
 * Build task.
 * Bundles your application for production.
 */
'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence(
        ['clean-build', 'clean-docs'],
        ['javascript-build', /*'jsdoc',*/ 'styleguide', 'sass-build', 'images-build', 'html-build'],
        cb
    );
});
