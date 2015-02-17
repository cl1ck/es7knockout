var notify  = require('gulp-notify'),
    gutil   = require('gulp-util'),
    config  = require('./config');

module.exports = function() {
    var args = Array.prototype.slice.call(arguments);

    // log to console
    if (config.usenotifier) {
        // Send error to notification center with gulp-notify
        notify.onError({
            title: 'Compile Error',
            message: '<%= error %>'
        }).apply(this, args);
    } else {
        gutil.log.apply(this, args);
    }

    // Keep gulp from hanging on this task
    this.emit('end');
};
