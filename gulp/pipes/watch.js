/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
    gulp.watch(config.sass.watch, ['scsslint', 'sass', 'styleguide']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.jade.src, ['jade']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.jslint.src, ['jslint']);
    gulp.watch(config.coffeelint.src, ['coffeelint']);
});
