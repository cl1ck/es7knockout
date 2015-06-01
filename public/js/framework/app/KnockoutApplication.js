import ko from 'knockout';
import Config from './AppConfig';
import Component from '../ko/Component';
import EventBus from '../event/EventBus';

export default class KnockoutApplication extends Component {
    /**
     * Constructor
     * @param {string} initialContext set initial app context (e.g. 'dev' or 'production')
     * @returns {KnockoutApplication} -
     */
    constructor(initialContext = 'global') {
        Config.setContext(initialContext);
        super({id: 'App'});

        this.running = false;

        // attach app to window for easier debugging
        if (Config.get('debug')) {
            window.app = this;
            window.ko = ko;
        }
    }

    /**
     * Bootstrap application by binding to the DOM element with ID 'app'
     * @returns {void} -
     */
    run() {
        if (this.running) {
            return;
        }

        ko.applyBindings(this, document.getElementById('app'));
        this.running = true;
    }
}
