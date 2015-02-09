var lazypipe    = require('lazypipe'),
    reload      = require('browser-sync').reload;

module.exports = lazypipe().pipe(reload, {stream:true});
