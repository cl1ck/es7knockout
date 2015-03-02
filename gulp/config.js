'use strict';

var basedir     = __dirname.substring(0, __dirname.lastIndexOf('/'));
var src         = basedir + '/src';
var builddir    = basedir + '/build';
var distdir     = basedir + '/dist';
var docdir      = builddir + '/docs';
var jspmdir     = src + '/jspm_packages';

module.exports = {
    // use gulp-notify to display system notifications (does not work on some DE-less systems)
    useNotifier: true,
    logErrors: false,
    builddir: builddir,
    distdir: distdir,
    browsersync: {
        server: {
            // serve src too (for sourcemaps)
            baseDir: [src, builddir],
            routes: {
                'config.js': basedir + '/config.js'
            }
        },
        files: [
            builddir + '/*.html',
            builddir + '/css/*.css',
            src + '/images/**/*.*',
            src + '/js/**/*.js'
        ],
        port: 3000,
        browser: [],
        tunnel: false
    },
    sass: {
        src: src + '/sass/*.{sass,scss}',
        dest: builddir + '/css',
        dist: distdir + '/css',
        watch: src + '/sass/**/*.*',
        settings: {
            sourceComments: 'map',
            style: 'expanded',
            imagePath: '/images'
        },
        autoprefixer: {
            browsers: ['last 2 version']
        }
    },
    images: {
        src: src + '/images/**/*.*',
        dest: builddir + '/images',
        dist: distdir + '/images/',
        settings: {
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }
    },
    jade: {
        src: src + '/jade/**',
        dest: builddir,
        dist: distdir
    },
    html: {
        src: src + '/*.{html,ejs}',
        dest: builddir,
        dist: distdir
    },
    javascript: {
        src: src + '/js/**/*.js',
        dist: distdir + '/js',
        bundleMain: 'js/main',
        es6runtime: jspmdir + '/babel-polyfill.js',
        uglifySettings: {
        }
    },
    styleguide: {
        dest: docdir,
        title: 'Build It',
        post: 3500
    },
    tests: {
        src: src + '/test/**/*.spec.js',
        karmaConfig: __dirname + '/../karma.conf.js'
    }
};
