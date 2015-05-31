import config from '../app/ContextConfig';
import EventBus from '../event/EventBus';
import io from 'socket.io-client';

class Socket {
    constructor() {
        this.connected = false;
        this.subscribedEvents = new Map();
    }

    emit(eventName, data = {}) {
        EventBus.emit(eventName, data);
    }

    connect(token, alias) {
        if (this.socket !== undefined) {
            return;
        }

        this.socket = io.connect(config.get('socketIO'));

        // Authenticate after establishing socket connection
        this.socket.on('connect', () => {
            this.socket.emit('authentication', {token: token, alias: alias})
        });

        // Add a disconnect listener
        this.socket.on('disconnect', () => {
            this.disconnect();
        });

        // handle authentication result
        this.socket.on('authentication', (data) => {
            if (data) {
                Logger.log('socket.io: authentication successful', 'socket');
                this.connected = true;
                this.resubscribeToEventsAndChannels();
                this.emit('socket:connected');
            } else {
                Logger.log('socket.io: authentication failed', 'socket');
                this.emit('socket:authError');
            }
        });

        // handle errors
        this.socket.on('error', (errorMessage) => {
            this.emit('socket:error', {
                error: errorMessage
            });
        });

        // handle generic server messages
        /*
         socket.on('message', function(data) {
         console.log('message:', data)
         })
         */
    }

    isConnected() {
        return this.connected
    }

    disconnect() {
        if (!this.connected) {
            return;
        }
        this.socket.removeAllListeners('disconnect');
        this.socket.removeAllListeners('connect');
        this.socket.removeAllListeners('authentication');
        this.socket.removeAllListeners('error');
        this.socket.disconnect();
        delete this.socket;
        this.connected = false;

        this.emit('socket:disconnected');
    }

    // Sends a message to the server
    sendMessage(message) {
        if (!this.connected) {
            throw new Error('cannot send message while socket is not connected');
        }
        this.socket.send(message);
    }

    // Sends a custom event to the server
    send(eventName, data) {
        if (!this.connected) {
            throw 'cannot send event while socket is not connected';
        }
        this.socket.emit(eventName, data);
    }

    subscribeToChannel(channel) {
        if (!this.subscribedEvents.has(channel)) {
            this.subscribedEvents.set(channel, new Set());
        }
        this._subscribeToChannel(channel);
    }

    _subscribeToChannel(channel) {
        if (this.connected) {
            Logger.log('Subscribing to channel ' + channel, 'socket');
            this.socket.emit('subscribe', channel);
        }
    }

    unsubscribeFromChannel(channel) {
        if (!this.subscribedEvents.has(channel)) {
            return;
        }

        // unsubscribe from all events
        let events = this.subscribedEvents.get(channel);
        for (let event of events) {
            this.unsubscribeFromEvent(channel, event);
        }

        this.subscribedEvents.delete(channel);
        this._unsubscribeFromChannel(channel);
    }

    _unsubscribeFromChannel(channel) {
        if (this.connected) {
            Logger.log('Unsubscribing from channel ' + channel, 'socket');
            this.socket.emit('unsubscribe', channel);
        }
    }

    subscribeToEvent(channel, eventName) {
        if (!this.subscribedEvents.has(channel)) {
            this.subscribeToChannel(channel);
        }

        /**
         * @type {Set}
         */
        let events = this.subscribedEvents.get(channel);
        if (!events.has(eventName)) {
            events.add(eventName);
        }

        this._subscribeToEvent(channel, eventName);
    }

    _subscribeToEvent(channel, eventName) {
        if (this.connected) {
            Logger.log('Subscribing to event ' + channel + ':' + eventName, 'socket');
            this.socket.on(channel + ':' + eventName, function(data) {
                Logger.log('received ' + channel + ':' + eventName, 'socket');
                EventBus.emit(channel + ':' + eventName, data);
            })
        }
    }

    unsubscribeFromEvent(channel, eventName) {
        if (!this.subscribedEvents.has(channel)) {
            return;
        }
        let events = this.subscribedEvents.get(channel);
        if (!events.has(eventName)) {
            return;
        }
        events.delete(eventName);
        this._unsubscribeFromEvent(channel, eventName);
    }

    _unsubscribeFromEvent(channel, eventName) {
        if (this.connected) {
            this.socket.removeAllListeners(channel + ':' + eventName);
        }
    }

    resubscribeToEventsAndChannels() {
        for (let [channel, events] of this.subscribedEvents) {
            this.subscribeToChannel(channel);
            for (let event of events) {
                this.subscribeToEvent(channel, event);
            }
        }
    }
}

let instance = new Socket();
export default instance;
