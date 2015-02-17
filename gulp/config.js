var src = './src',
    dest = './build';

module.exports = {
    // use gulp-notify to display system notifications (does not work on some DE-less systems)
    usenotifier: true,
    browsersync: {
        server: {
            // server src too (for sourcemaps)
            baseDir: [dest, src]
        },
        files: [
            dest + '/**/*.*',
            '!' + dest + '/**.map'
        ],
        port: 3500,
        browser: [],
        tunnel: false
    },
    sass: {
        src: src + '/sass/*.{sass,scss}',
        dest: dest + '/css/',
        watch: src + '/sass/**/*.*',
        settings: {
            sourceComments: 'map',
            imagePath: '/images'
        }
    },
    autoprefixer: {
        browsers: ['last 2 version']
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    jade: {
        src: src + '/jade/**',
        dest: dest
    },
    html: {
        src: src + '/html/*.html',
        dest: dest
    },
    javascript: {
        src: src + '/js/main',
        watch: src + '/js/**/*.js',
        dest: dest + '/js/app.js',
        fixmyjs: false
    },
    styleguide: {
        dest: dest + '/docs',
        title: 'Build It'
    }
};
