Framework for using KnockoutJS components with ES6/7

### Installation

```
npm install gulp jspm karma-cli -g
npm install
jspm init
```

### Development

```
gulp
```

Runs development server (using BrowserSync) on http://localhost:3000

### Testing

```
gulp test
```

This will lint and check codestyle on all sourcefiles and then run your unit tests.

### Production

```
gulp build
```

Bundles application for production.

### Using ES6 classes for creating components

Example template:

```
<!-- ko if: !clicked -->
<button><i class="fa" data-bind="css: 'fa-' + icon + ' ', click: click, attr: { title: title }"></i><span
data-bind="text: title"></span></button>
<!-- /ko -->
<!-- ko if: clicked -->
<button><i class="fa fa-spinner fa-spin" data-bind="attr: { title: 'Loading: ' + title }"></i><span data-bind="text: title"></span></button>
<!-- /ko -->
```

Example class:

```
// import Component base class
import Component from '../../ko/Component';

// import template file
import template from './ActionButton.html!text';

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
         * A valid implementation could look like this:
         * <action-button params="icon: 'user', title: 'user', event: 'clicked', data: userID, id:
         * 'testbutton', parent: $root"></action-button>
         *
         * Notice the two special parameters 'id' and 'parent' which are used for event routing.
         * 'id' defines a name for the component
         * 'parent' has to point to the current component ($root on toplevel, $component within a parent component)
         */
        super(params, 'icon', 'title', 'event', 'data');

        // now define your observables (parameters are already automatically imported!)
        this.clicked = false;

        // import all observables defined to this point
        this.importObservables();

        // add an event listener for event 'confirm'
        this.on('confirm', (event) => {
            this.clicked = false;
        })
    }

    // getter methods will be transformed into ko.pureComputed
    get enabled() {
        return !this.clicked;
    }

    // simple class method (callable from within the component
    click() {
        this.clicked = true;
        this.emit(this.event, this.data);
    }
}

// finally register your custom element for the component
Component.registerComponent('action-button', ActionButton, template);
```
