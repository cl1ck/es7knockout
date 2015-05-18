import ko from 'knockout';
import DataStore from '../data/DataStore';

export default class ObservableClass {
    /**
     * Converts class properties to knockout observables and getter functions to knockout pureComputed
     */
    importObservables() {
        Object.getOwnPropertyNames(this)
            .map(name => ({
                name,
                descriptor: Object.getOwnPropertyDescriptor(this, name)
            }))
            .filter(obj => obj.descriptor.configurable)
            .filter(obj => {
                // filter data stores
                return !(this[obj.name] instanceof DataStore);
            })
            .filter(obj => ['_', '$'].indexOf(obj.name.substr(0, 1)))
            .forEach(obj => {
                let observable;

                // Access to the original observable is required to pass an observable as a parameter
                // to a knockout component. You can access it by prepending $ to the observable's name.
                // E.g. <my-component params="parameterName: $myObservable"></my-component>
                if (Object.prototype.toString.call(this[obj.name]) === '[object Array]') {
                    observable = this['$' + obj.name] = ko.observableArray(obj.descriptor.value);
                } else {
                    observable = this['$' + obj.name] = ko.observable(obj.descriptor.value);
                }

                // Adding getter and setter for easier access to the observable.
                // E.g. you can now use data-bind="text: myObservable && myOtherObservable"
                // instead of data-bind="text: myObservable() && myOtherObservable()"
                Object.defineProperty(this, obj.name, {
                    enumerable: true,
                    configurable: false,
                    get: observable,
                    set: observable
                });
            });

        // convert getter functions to knockout pureComputed & auto-bind class methods to this
        let proto = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(proto)
            .map(name => ({
                name,
                descriptor: Object.getOwnPropertyDescriptor(proto, name)
            }))
            .filter(obj => obj.descriptor.configurable)
            .filter(obj => obj.name !== 'constructor')
            .forEach(obj => {
                if ('get' in obj.descriptor) {
                    let computed = ko.pureComputed({
                        read: obj.descriptor.get.bind(this),
                        write: obj.descriptor.set ? obj.descriptor.set.bind(this) : null
                    });

                    Object.defineProperty(this, obj.name, {
                        enumerable: true,
                        configurable: true,
                        get: computed,
                        set: obj.descriptor.set ? computed : undefined
                    });

                    // attach raw computed
                    Object.defineProperty(this, '$' + obj.name, {
                        enumerable: true,
                        configurable: true,
                        writable: obj.descriptor.set ? true : false,
                        value: computed
                    });
                } else {
                    let func = obj.descriptor.value;
                    this[obj.name] = func.bind(this);
                }
            })
    }
}
