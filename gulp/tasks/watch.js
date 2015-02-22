'use strict';

var gulp    = require('gulp');
var config  = require('../config');

gulp.task('watch', ['build', 'browsersync'], function() {
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.jade.src, ['jade']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.sass.watch, ['sass']);
    gulp.watch([config.javascript.watch, config.javascript.gulp], ['javascript']);
    gulp.watch(config.sass.watch, ['styleguide']);
});
