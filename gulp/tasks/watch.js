var gulp    = require('gulp');
var config  = require('../config');

gulp.task('watch', ['build', 'browsersync'], function() {
    gulp.watch(config.images.src, ['images-build']);
    gulp.watch(config.jade.src, ['jade']);
    gulp.watch(config.html.src, ['html-build']);
    gulp.watch(config.sass.watch, ['sass-build']);
    gulp.watch(config.javascript.src, ['javascript-build']);
    gulp.watch(config.sass.watch, ['styleguide']);
});
