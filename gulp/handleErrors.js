var notify = require("gulp-notify");
var gutil = require('gulp-util');

module.exports = function() {
    var args = Array.prototype.slice.call(arguments);

    // log to console
    gutil.log.apply(this, args);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};
