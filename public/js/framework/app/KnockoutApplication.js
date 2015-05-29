import ko from 'knockout';
import context from './AppContext';
import config from './ContextConfig';
import Component from '../ko/Component';
import EventBus from '../event/EventBus';

export default class KnockoutApplication extends Component {
    /**
     * Constructor
     * @param initialContext set initial app context (e.g. 'dev' or 'production')
     */
    constructor(initialContext = 'global') {
        context.setContext(initialContext);
        super({id: 'App'});

        this.running = false;

        // attach app to window for easier debugging
        if (config.get('debug')) {
            window.app = this;
            window.ko = ko;
        }
    }

    /**
     * Bootstrap application by binding to the DOM element with ID 'app'
     */
    run() {
        if (this.running) {
            return;
        }

        ko.applyBindings(this, document.getElementById('app'));
        this.running = true;
    }

    /**
     * Set app context
     * @param newContext name of the new context
     */
    static setContext(newContext) {
        context.setContext(newContext);
    }

    /**
     * Get current app context
     * @returns {String}
     */
    static getContext() {
        return context.getContext();
    }
}
