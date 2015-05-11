'use strict';

var notify      = require('gulp-notify');
var gutil       = require('gulp-util');
var config      = require('./config');
var logErrors   = require('./config').logErrors;

module.exports = function() {
    var args = Array.prototype.slice.call(arguments);

    // use notifier if enabled
    if (config.useNotifier) {
        notify.onError({
            title: 'Gulp Error',
            message: '<%= error.message %>'
        }).apply(this, args);
    }

    // log error
    if (logErrors) {
        gutil.log.apply(this, args);
    }

    // Keep gulp from hanging on this task
    this.emit('end');
};
