import Event from './Event';
import ko from 'knockout';

/**
 * Global event bus for inter-component communication
 */
class EventBus {
    /**
     * Constructor
     */
    constructor() {
        this.nodes = new Map();
        this.listeners = new Map();
        this._ID = Symbol('EventBus');
    }

    /**
     * Register an event node with the event bus.
     * @param eventNode the node to register
     * @param className the node's classname
     * @returns {Symbol} new unique ID to identify the node
     */
    registerNode(eventNode, className) {
        let nodeID = Symbol(className);
        this.nodes.set(nodeID, eventNode);
        //console.log('registered',nodeID.toString());
        return nodeID;
    }

    /**
     * Unregister an event node.
     * @param nodeID the unique ID of the node to unregister
     */
    unregisterNode(nodeID) {
        this.nodes.delete(nodeID);
    }

    /**
     * Check if a node is registered
     * @param nodeID the unique ID of the node to check
     * @returns {boolean} true if it has the node
     */
    hasNode(nodeID) {
        return this.nodes.has(nodeID);
    }

    /**
     * Send event to a given node.
     * @param nodeID ID of the node to send the event to
     * @param event the event to send
     */
    notify(nodeID, event) {
        if (!this.nodes.has(nodeID)) {
            return;
        }
        this.nodes.get(nodeID).handleEvent(event);
    }

    /**
     * Register event listener
     * @param listenerID id of the event node that listens to an event
     * @param eventName name of the event to listen to
     * @param callback callback function
     */
    registerListener(listenerID, eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Map());
        }

        let listeners = this.listeners.get(eventName);
        listeners.set(listenerID, callback);
    }

    /**
     * Remove event listener
     * @param listenerID id of the event node that listens to an event
     * @param eventName name of the event
     */
    removeListener(listenerID, eventName) {
        if (!this.listeners.has(eventName)) {
            return;
        }

        /**
         * @type {Map}
         */
        let listeners = this.listeners.get(eventName);

        if (!listeners.has(listenerID)) {
            return;
        }
        listeners.delete(listenerID);
    }

    /**
     * Route a global event
     * @param {Event} event
     */
    route(event) {
        if (!this.listeners.has(event.name)) {
            return;
        }

        let listeners = this.listeners.get(event.name);

        for (let [listenerID, callback] of listeners) {
            if (!event.gotHandledBy(listenerID)) {
                callback(event);
                event.handledBy(listenerID);
            }
        }
    }

    /**
     * Emit a global event.
     * @param eventName name of the event to emit
     * @param data event payload
     */
    emit(eventName, data = null) {
        let event = new Event(eventName, this._ID, data);
        this.route(event);
    }
}

// export Singleton
let instance = new EventBus();
export default instance;
