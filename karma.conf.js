/*global module*/
module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jspm', 'mocha', 'sinon-chai'],

        // only load polyfill, the remaining files will be loaded by jspm
        files: [
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        preprocessors: {
            'public/js/**/*(!spec).js': ['babel', 'coverage'],
            'public/js/**/*.spec.js': ['babel']
        },

        babelPreprocessor: {
            options: {
                modules: 'system',
                sourceMap: 'inline'
            }
        },

        jspm: {
            loadFiles: ['public/js/**/*.spec.js'],
            serveFiles: ['public/js/**/*.js'],
            config: 'jspm_config.js',
            packages: 'jspm_packages'
        },

        proxies: {
        },

        plugins: [
            'karma-junit-reporter',
            'karma-coverage',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-coverage',
            'karma-jspm',
            'karma-phantomjs2-launcher',
            'karma-mocha-reporter',
            'karma-babel-preprocessor'
        ],

        // test results reporter to use
        reporters: [
            'mocha',
            'junit',
            'coverage'
        ],

        junitReporter: {
            outputFile: 'reports/test-units.xml',
            suite: ''
        },

        coverageReporter: {
            dir : 'reports/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        browsers: ['PhantomJS2'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
