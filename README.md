buildit
============

Starter project for my personal frontend development projects.
Based on [gulp-starter](https://github.com/greypants/gulp-starter/wiki) by [greypants](https://github.com/greypants/).

Includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim)) __deprecated__
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds) __deprecated__
- [JSPM](https://jspm.io) (modern package manager for the frontend)
- [ES6] Support for ES6 Harmony using traceur
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [CoffeeScript](http://coffeescript.org/) (with source maps!)
- [Jade](http://jade-lang.com) for templates
- [jQuery](http://jquery.com/) (from npm)
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Bower](http://bower.io/) for installing 3rd party dependencies
- [Bootstrap](http://getbootstrap.com) (from bower)
- Linting for all source files
- Image optimization
- Error Notifications in Notification Center
- Non common-js vendor code (like a jQuery plugin)

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install jspm globally

JSPM must be installed globally in order to use the command line tools. *You may need to use `sudo`*

```
npm install -g jspm
```

### Install Gulp globally

Gulp must be installed globally, too.

```
npm install -g gulp
```

Alternatively, you can run the version of gulp installed local to the project instead with

```
./node_modules/.bin/gulp
```

### Install styledocco globally

Styledocco is the third package that must be installed globally (to be able to generate dynamic style guides from your SCSS).

```
npm install -g styledocco
```

### Install npm dependencies

```
npm install
```

This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.

### Install bower dependencies

```
bower install __deprecated__
```

This runs through all dependencies listed in `bower.json` and downloads them
to a `bower_components` folder in your project directory.

__Should be replaced by jspm__

### Install required ruby gems

```
gem install bundler
```

You'll need to install [bundler](http://bundler.io) first. This will enable you to install the required ruby gems.

```
bundle install
```

This will install all gems listed in `Gemfile`.

### Run gulp and be amazed.

```
gulp
```

This will run the `default` gulp task defined in `gulp/tasks/default.js`, which does the following:
- Run 'watch', which has 2 task dependencies, `['setWatch', 'browserSync']`
- `setWatch` sets a variable that tells the browserify task whether or not to use watchify.
- `browserSync` has `build` as a task dependecy, so that all your assets will be processed before browserSync tries to serve them to you in the browser.
- `build` includes the following tasks: `['browserify', 'sass', 'images', 'jade', 'html']`

### Configuration

All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.

## Disable 'gulp-notify'

If you are running on a system that does not support notifications by `gulp-notify`, you can disable it by using enviroment variable `DISABLE_NOTIFIER`:

```
export DISABLE_NOTIFIER=true;
```
