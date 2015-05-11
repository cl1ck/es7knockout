import ObservableClass from './ObservableClass';
import ko from 'knockout';
import EventBus from '../event/EventBus';
import Event from '../event/Event';

export default class Component extends ObservableClass {
    /**
     * Constructor
     * @param parameters Parameters imported from knockoutjs component definition
     * @param requiredParameters list of all required parameters
     */
    constructor(parameters = {}, ...requiredParameters) {
        super();
        if (!parameters.id) {
            throw 'each component must have an "id" param';
        }

        // internal variables for event routing
        this._parentID = null;
        this._eventSubscriptions = new Map();
        if (ko.isObservable(parameters.id)) {
            this._identifier = parameters.id();
        } else {
            this._identifier = parameters.id;
        }
        this._ID = EventBus.registerNode(this, this._identifier);
        this._childNodes = new Map();

        // set parent component
        if (parameters.parent !== undefined) {
            this.setParentComponent(parameters.parent);
        }

        // ensure all required parameters exist
        if (requiredParameters) {
            requiredParameters.forEach(parameter => {
                if (parameters[parameter] === undefined) {
                    throw 'required parameter "' + parameter + '" is missing';
                }
            })
        }

        // import parameters
        Object.getOwnPropertyNames(parameters)
            .map(name => ({
                name,
                descriptor: Object.getOwnPropertyDescriptor(parameters, name)
            }))
            .filter(obj => obj.descriptor.configurable)
            .filter(obj => obj.name !== '$raw')
            .forEach(obj => {
                if (ko.isComputed(obj.descriptor.value) || ko.isObservable(obj.descriptor.value)) {
                    // import knockout computed
                    let subscribable = this['$' + obj.name] = obj.descriptor.value;

                    // redefine function to use getter and setter of subscribable
                    Object.defineProperty(this, obj.name, {
                        enumerable: true,
                        configurable: false,
                        get: subscribable,
                        set: obj.descriptor.set ? subscribable : undefined
                    });

                } else {
                    // import common values
                    let value = obj.descriptor.value;

                    // redefine function to use getter and setter of computed observable
                    Object.defineProperty(this, obj.name, {
                        enumerable: true,
                        configurable: false,
                        writable: false,
                        value: value
                    });
                }
            });
    }

    static registerComponent(customElementName, viewModel, template) {
        if (viewModel === null) {
            ko.components.register(customElementName, {
                template: template
            });
        } else {
            ko.components.register(customElementName, {
                viewModel: viewModel,
                template: template
            });
        }
    }

    /**
     * Set parent node
     * @param {Component} parentComponent
     */
    setParentComponent(parentComponent) {
        this._parent = parentComponent;
        this._parentID = parentComponent._ID;
        parentComponent.registerChildComponent(this._identifier, this._ID);
    }

    /**
     * Receives and handles an event
     * @param {Event} event
     */
    handleEvent(event) {
        // handle event
        if (this._eventSubscriptions.has(event.name)) {
            this._eventSubscriptions.get(event.name)(event);
            event.handledBy(this._ID);
        }

        // route to parent if necessary
        if (event.bubble && !event.stopped) {
            this.bubbleEvent(event);
        }
    }

    bubbleEvent(event) {
        if (this._parentID !== null) {
            EventBus.notify(this._parentID, event);
        } else {
            EventBus.route(event);
        }
    }

    /**
     * Dispose Component (called by knockoutjs)
     */
    dispose() {
        EventBus.unregisterNode(this._ID)
        if (this._parent) {
            this._parent.unregisterChildComponent(this._identifier, this._ID);
        }
    }

    /**
     * Emit an event
     * @param eventName name of the event
     * @param data event payload
     */
    emit(eventName, data = {}) {
        let event = new Event(eventName, this._ID, data);
        this.bubbleEvent(event);
    }

    /**
     * Register an event callback
     * @param eventName name of the event to register the callback for
     * @param callback callback function
     * @param registerGlobal true to register callback with the global event handler, false otherwise
     */
    on(eventName, callback, registerGlobal = true) {
        if (registerGlobal) {
            EventBus.registerListener(this._ID, eventName, callback);
        } else {
            this._eventSubscriptions.set(eventName, callback);
        }
    }

    /**
     * Registers a child component.
     * @param childIdentifier named ID of the child component
     * @param childUniqueID unique ID of the child component
     */
    registerChildComponent(childIdentifier, childUniqueID) {
        if (!this._childNodes.has(childIdentifier)) {
            this._childNodes.set(childIdentifier, new Set());
        }
        let childNodes = this._childNodes.get(childIdentifier);
        childNodes.add(childUniqueID);
    }

    /**
     * Unregister child component.
     * @param childIdentifier named ID of the child component
     * @param childUniqueID unique ID of the child component
     */
    unregisterChildComponent(childIdentifier, childUniqueID) {
        if (!this._childNodes.has(childIdentifier)) {
            return;
        }
        let childNodes = this._childNodes.get(childIdentifier);
        childNodes.delete(childUniqueID);
    }

    /**
     * Send event to child nodes
     * @param childIdentifier named ID of the child component to notify
     * @param eventName name of the event to send
     * @param data event payload
     */
    notify(childIdentifier, eventName, data = {}) {
        if (!this._childNodes.has(childIdentifier)) {
            return
        }

        let childNodes = this._childNodes.get(childIdentifier)

        for (let childNode of childNodes) {
            let event = new Event(eventName, data, false)
            EventBus.notify(childNode, event)
        }
    }
}
