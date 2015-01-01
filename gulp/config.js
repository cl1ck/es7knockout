var dest = './build';
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for sass sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + '/**/*.*',
            // Exclude Map files
            '!' + dest + '/**.map'
        ]
    },
    sass: {
        src: src + '/sass/*.{sass,scss}',
        dest: dest + '/css/',
        watch: src + '/sass/**/*.*',
        settings: {
            // Required if you want to use SASS syntax
            // See https://github.com/dlmanning/gulp-sass/issues/81
            sourceComments: 'map',
            imagePath: '/images' // Used by the image-url helper
        }
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    jade: {
        src: src + '/jade/**',
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        coffeescript: true,
        // Additional file extentions to make optional
        extensions: ['.coffee'],
        // A separate bundle will be generated for each
        // bundle config in the list below
        coffeeBundleConfigs: [{
            entries: src + '/coffeescript/app.coffee',
            dest: dest + '/js/',
            outputName: 'app.js'
        }, {
            entries: src + '/coffeescript/head.coffee',
            dest: dest + '/js/',
            outputName: 'head.js'
        }],
        jsBundleConfigs: [{
            entries: src + '/javascript/app.coffee',
            dest: dest + '/js/',
            outputName: 'app.js'
        }, {
            entries: src + '/javascript/head.coffee',
            dest: dest + '/js/',
            outputName: 'head.js'
        }]
    },
    html: {
        src: src + '/html/**',
        dest: dest
    },
    jslint: {
        src: src + '/javascript/**/*.js',
        dest: src + '/javascript/',
        fixmyjs: false
    }
};
