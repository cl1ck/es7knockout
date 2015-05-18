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
         * When creating the component from within a template, an exception will be thrown if one of them is missing. .
         *
         * A valid implementation is shown below.
         */
        super(params, 'icon', 'title', 'event', 'data');

        // now define your observables (parameters are already automatically imported!)
        this.clicked = false;

        // import all observables defined to this point
        this.importObservables();

        // add an event listener for event 'confirm'
        this.on('confirm', (event) => {
            event.stop();
            this.clicked = false;
        });
    }

    /**
     * Getter methods will be transformed into ko.pureComputed
     */
    get enabled() {
        return !this.clicked;
    }

    /**
     * Simple class method (callable from within the component).
     */
    click() {
        /**
         * Read computed value.
         * Note that brackets are not needed.
         */
        if (!this.enabled) {
            return;
        }

        /**
         * Update the 'clicked' observable.
         * Brackets are not needed here, too. The underlying observable will be updated automatically.
         */
        this.clicked = true;

        // emit event to parent(s)
        this.emit(this.event, this.data);
    }
}

// finally register your custom element for the component
Component.registerComponent('action-button', ActionButton, template);
