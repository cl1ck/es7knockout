var gulp    = require('gulp');
var config  = require('../config');

gulp.task('watch', ['build', 'browsersync'], function() {
    gulp.watch(config.html.src, ['html-build']);
    gulp.watch(config.sass.allSrc + '/!(_all).scss', ['sass-build', 'styleguide']);
});
