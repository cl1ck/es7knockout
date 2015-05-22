/**
 * Gulp tasks configuration
 */
'use strict';

// TODO: set your own project title
var projectTitle    = 'Build It';

// project root
var baseDir         = __dirname.substring(0, __dirname.lastIndexOf('/')) + '/';

// source files
var srcDir          = baseDir + 'public/';

// temp directory used for serving compiled assets in development
var devTempDir      = baseDir + 'temp/';

// target directory for build
var buildTargetDir  = baseDir + 'build/';

// jspm subDirectory
var jspmDir         = baseDir + 'jspm_packages/';

// report dir
var reportDir       = baseDir + 'reports/';

module.exports = {
    // use gulp-notify to display system notifications (does not work on some DE-less systems)
    useNotifier: false,

    // log errors to console
    logErrors: true,

    // require tests to pass in order to create build
    runTestsOnBuild: true,

    // default task when invoking gulp without arguments
    // default:     'watch'
    // alternative: 'build'
    defaultTask: 'watch',

    // sass settings
    sass: {
        subDir: 'css/',
        files: '*.scss',
        watchFiles: '**/!(_all).scss',
        settings: {
            sourceComments: 'map',
            style: 'expanded',
            imagePath: '/images'
        },
        scssLintConfig: '.scss-lint.yml',
        autoprefixer: {
            browsers: ['last 2 version']
        }
    },

    // image optimization
    images: {
        subDir: 'images/',
        files: '**/*.*',
        settings: {
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }
    },

    // html and ejs
    html: {
        subDir: '',
        files: '*.{html,ejs}',
    },

    // javascript bundle settings
    javascript: {
        subDir: 'js/',
        files: '**/*.js',
        // main bundle file to compile with jspm
        bundleMain: 'public/js/main',
        // es6 runtime polyfill
        es6runtime: 'babel-polyfill.js',
        uglifySettings: {
        },
        jscsConfig: '.jscsrc',
        esLintOutput: reportDir + '/eslint-checkstyle.xml'
    },

    // styleguide
    styleguide: {
        subDir: 'doc/',
        title: projectTitle,
        post: 3500
    },

    // testrunner config
    tests: {
        subDir: 'js/',
        files: '/js/**/*.spec.js',
        reportDir: reportDir,
        karmaConfig: baseDir + '/karma.conf.js'
    },

    // BrowserSync options (alter paths only if you know what you do)
    browsersync: {
        server: {
            baseDir: [srcDir, devTempDir],
            routes: {
                '/jspm_config.js': baseDir + 'jspm_config.js',
                '/jspm_packages': jspmDir
            }
        },
        files: [
            devTempDir + '*.html',
            devTempDir + 'css/*.css',
            srcDir + 'images/**/*.*',
            srcDir + 'js/**/*.js'
        ],
        port: 3000,
        browser: [],
        tunnel: false
    },

    // directories, do not change!
    baseDir: baseDir,
    srcDir: srcDir,
    devTempDir: devTempDir,
    buildTargetDir: buildTargetDir,
    jspmDir: jspmDir
};
