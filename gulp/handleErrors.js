var notify          = require('gulp-notify'),
    gutil           = require('gulp-util'),
    usenotifier    = require('./config').usenotifier;

module.exports = function() {
    var args = Array.prototype.slice.call(arguments);

    // use notifier if enabled
    if (usenotifier) {
        // Send error to notification center with gulp-notify
        notify.onError({
            title: 'Compile Error',
            message: '<%= error %>'
        }).apply(this, args);
    } else {
        // log error
        gutil.log.apply(this, args);
    }

    // Keep gulp from hanging on this task
    this.emit('end');
};
