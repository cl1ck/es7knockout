import ko from 'knockout';
import EventBus from '../event/EventBus';
import {isArray} from '../util/Utilities';

/**
 * Used to securely update data store values.
 */
class Update {
    constructor(value) {
        this.value = value;
    }
}

/**
 * A 'somehow' protected data store.
 */
export default class DataStore {
    /**
     * Constructor
     * @param name name of the data store
     */
    constructor(name = 'datastore') {
        this._setters = new Map();
        this._ID = EventBus.registerNode(this, name);
    }

    /**
     * Converts object properties to secured knockout observables.
     */
    importData() {
        Object.getOwnPropertyNames(this)
            .map(name => ({
                name,
                descriptor: Object.getOwnPropertyDescriptor(this, name)
            }))
            .filter(obj => obj.descriptor.configurable)
            .filter(obj => ['_', '$'].indexOf(obj.name.substr(0, 1)))
            .forEach(obj => {
                if (this[obj.name] instanceof DataStore) {
                    throw 'importing DataStores into DataStores is not allowed';
                }

                let observable;
                if (Object.prototype.toString.call(this[obj.name]) === '[object Array]') {
                    observable = this['$' + obj.name] = ko.observableArray(this[obj.name]);
                } else {
                    observable = this['$' + obj.name] = ko.observable(this[obj.name]);
                }

                // secure setter
                let setter = function (update) {
                    if (!(update instanceof Update)) {
                        throw 'only Updates may change values on a datastore';
                    }
                    observable(update.value);
                };

                // store all setters for easier access
                this._setters.set(obj.name, setter);

                Object.defineProperty(this, obj.name, {
                    enumerable: true,
                    configurable: false,
                    get: observable,
                    set: setter
                })
            });

        // auto-bind data store methods to 'this'
        let proto = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(proto)
            .map(name => ({
                name,
                descriptor: Object.getOwnPropertyDescriptor(proto, name)
            }))
            .filter(obj => obj.descriptor.configurable)
            .filter(obj => obj.name !== 'constructor')
            .forEach(obj => {
                let func = obj.descriptor.value;
                this[obj.name] = func.bind(this);
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
     * @param data object used to update data store
     */
    update(data) {
        if (!(data instanceof Object)) {
            throw 'update data must be an instance of Object';
        }

        Object.getOwnPropertyNames(data)
            .filter(name => this._setters.has(name))
            .forEach(name => {
                this.set(name, data[name]);
            })
    }

    /**
     * Update a data store value
     * @param key name of the value to update
     * @param value new value
     */
    set(key, value) {
        if (!this._setters.has(key)) {
            throw 'property ' + key + ' does not exist in DataStore';
        }
        let updater = new Update(value);
        this._setters.get(key)(updater);
    }

    /**
     * Register callback for global event
     * @param event name of the event to register
     * @param callback the callback function
     */
    on(event, callback) {
        EventBus.registerListener(this._ID, event, callback);
    }
}
