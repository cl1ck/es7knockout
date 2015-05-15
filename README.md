<<<<<<< HEAD
# Framework for using KnockoutJS components with ES6/7

## Installation
=======
# buildit
============

Starter project for my personal frontend development projects.
Based on [gulp-starter](https://github.com/greypants/gulp-starter/) by [greypants](https://github.com/greypants/).

Includes the following tools, tasks, and workflows:

- [JSPM](https://jspm.io) (modern package manager for the frontend)
- [ES6](http://kangax.github.io/compat-table/es6/) Harmony support using the babel transpiler
- [SASS](http://sass-lang.com/) (using libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap) and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [BrowserSync](http://browsersync.io) for live reloading
- [SC5 Styleguide](http://styleguide.sc5.io/) for generating awesome styleguides using KSS notation
- Testing with Karma, Mocha, Sinon & Chai
- Linting and codestyle check for all source files
- Image optimization
- Error notifications in Notification Center

*NOTE:* This project does not contain any example code! If you want a more complete example of how to use `buildit`
check out [buildit-example](https://github.com/cl1ck/buildit-example).


## Start new project

To start a new project `app` simply fork `buildit`:
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e

```
npm install gulp jspm karma-cli -g
npm install
jspm init
```

## Development

```
<<<<<<< HEAD
gulp
```

Runs development server (using BrowserSync) on http://localhost:3000

## Testing

```
gulp test
```

This will lint and check codestyle on all sourcefiles and then run your unit tests.

## Production

```
gulp build
```

Bundles application for production.

## Using ES6 classes for creating components

### Example template

```html
<!-- ko if: !clicked -->
<button data-bind="click: click, attr: { title: title }">
    <i data-bind="css: 'fa fa-' + icon"></i>
    <span data-bind="text: title"></span>
</button>
<!-- /ko -->
<!-- ko if: clicked -->
<button disabled data-bind="attr: { title: 'Loading: ' + title }">
    <i class="fa fa-spinner fa-spin"></i>
    <span data-bind="text: title"></span>
</button>
<!-- /ko -->
```

### Example class
=======
git remote add origin git@github.com:username/app.git
git push origin master
git branch --set-upstream-to origin/master
```

## Installation: Quick guide (experienced user)

Make sure the sass and scss-lint ruby gems are installed. Then do:

```
npm install
npm install gulp jspm karma-cli -g
jspm install
```

## Installation: Detailed (new to nodejs / gulp)

`buildit` requires several dependencies. In order to install them, follow the instructions below. *You may need to use `sudo` for some commands*

### 1. Install nodejs

If you've never used Node or npm before, you'll need to install nodejs.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### 2. Install jspm, gulp and the karma-cli globally

jspm, gulp and karma-cli should be installed globally in order to use the command line tools.

```
npm install gulp jspm karma-cli -g
```

### 3. Install npm & jspm dependencies

```
npm install
jspm install
```

Install all npm and jspm dependencies.

### 4. Install sass and scss-lint

Make sure ruby is installed. Then use the following commands to install the gems:

```
gem install bundler
bundle install
```

## Development
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e

```javascript
// import Component base class
import Component from '../../ko/Component';

<<<<<<< HEAD
// import template file
import template from './ActionButton.html!text';
=======
This will run the default gulp task which compiles all source files and starts BrowserSync on port 3000.
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e

// extend the Component base class
export default class ActionButton extends Component {
    /**
     * Constructor (knockoutjs will pass parameters to your constructor)
     * see: http://knockoutjs.com/documentation/component-custom-elements.html
     */
    constructor(params) {
        /**
         * Always call 'super' first!
         * The additional parameters define required parameters from knockout.
         * It'll throw an exception if one of them is missing from the component definition.
         */
        super(params, 'icon', 'title', 'event', 'data');

        // now define your observables (parameters are already automatically imported!)
        this.clicked = false;

<<<<<<< HEAD
        // import all observables defined to this point
        this.importObservables();

        // add an event listener for event 'confirm'
        this.on('confirm', (event) => {
            this.clicked = false;
        })
    }
=======
## Testing
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e

    // getter methods will be transformed into ko.pureComputed
    get enabled() {
        return !this.clicked;
    }

<<<<<<< HEAD
    // simple class method (callable from within the component
    click() {
        this.clicked = true;

        // emit event
        this.emit(this.event, this.data);
    }
}
=======
This will lint and check codestyle for all sourcefiles and run your tests.
Tests reside in the `src/test` directory and end with `spec.js`.

## Production
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e

// finally register your custom element for the component
Component.registerComponent('action-button', ActionButton, template);
```
<<<<<<< HEAD

### Usage of components
Simply include your custom element in a template and pass the required parameters:

```
<action-button params="icon: 'user', title: 'user', event: 'test-clicked', data: 'test', id: 'testbutton', parent: $root"></action-button>
```

Notice the two special parameters 'id' and 'parent' which are used for event routing:
- `id` defines a name for the component
- `parent` has to point to the current component ($root on top level, $component within a parent component)
=======
gulp build
```

Bundle your application for production by combining, minifying and optimizing all of your source files.

## Configuration

All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.

## Update

To update `buildit` merge all changes into your fork:

```
git pull upstream master
npm install
jspm install
```

## Roadmap
- [ ] add jsdoc or some other kind of js source docs
- [ ] add code coverage as soon as the [problems with karma-jspm](https://github.com/Workiva/karma-jspm/issues/22) are solved
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e
