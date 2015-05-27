import EventBus from '../event/EventBus';
import {isArray} from '../util/Utilities';
import ObservableClass from '../ko/ObservableClass';

/**
 * A data store.
 */
export default class DataStore extends ObservableClass {
    /**
     * Constructor
     * @constructor
     * @param {String} name of the data store
     * @returns {DataStore} new DataStore
     */
    constructor(name = 'datastore') {
        super();
        this._ID = EventBus.registerNode(this, name);
        this.on('changed:' + name, (event) => {
            this.update(event.data);
            event.stop();
        });
    }

    /**
     * Update data store using object notation (e.g.:
     * {
     *     dataStoreProperty: newValue,
     *     anotherProperty: otherValue
     * }
     *
     * Usually used to update data store from JSON data obtained from an API.
     *
     * @param {object} data used to update data store
     * @returns {undefined}
     */
    update(data) {
        if (!(data instanceof Object)) {
            throw new Error('update data must be an instance of Object');
        }

        Object.getOwnPropertyNames(data)
            .filter(name => this._setters.has(name))
            .forEach(name => {
                this.set(name, data[name]);
            });
    }

    /**
     * Update a data store value
     * @param {string} key name of the value to update
     * @param {*} value new value
     * @returns {undefined}
     */
    set(key, value) {
        if (!this[key]) {
            throw 'value with key ' + key + ' does not exist!';
        }
        this[key] = value;
    }

    /**
     * Register callback for global event
     * @param {string} event name of the event to register
     * @param {function} callback the callback function
     */
    on(event, callback) {
        EventBus.registerListener(this._ID, event, callback);
    }
}
