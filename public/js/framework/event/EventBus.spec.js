import Event from './Event';
import EventBus from './EventBus';

class EventNode {
    constructor() {
        this.data = null;
        this.name = null;
    }

    handleEvent(event) {
        this.data = event.data;
        this.name = event.name;
    }
}

describe('EventBus', () => {
    it('allows to register and unregister nodes', () => {
        let id = EventBus.registerNode('test', 'node');

        assert.isTrue(EventBus.hasNode(id));
        EventBus.unregisterNode(id);
        assert.isFalse(EventBus.hasNode(id));
    });

    it('allows to register and remove listeners', () => {
        EventBus.registerListener('listener', 'event1', (event) => {});
        assert.doesNotThrow(() => {
            EventBus.removeListener('nolistener', 'event1');
        });
        EventBus.removeListener('listener', 'event1');
        assert.doesNotThrow(() => {
            EventBus.removeListener('listener', 'noevent');
        });
        assert.doesNotThrow(() => {
            EventBus.removeListener('listener', 'event');
        });
    });

    it('routes events to registered listeners', () => {
        EventBus.registerListener('listener', 'event2', (event) => {
            assert.isTrue(event.data === 'data');
        });
        EventBus.emit('event2', 'data');
        EventBus.emit('noevent', 'data');
        EventBus.emit('event', 'notdata');
    });

    it('does not route events to removed listeners', () => {
        let changed = false;

        EventBus.registerListener('listener', 'event2', (event) => {
            changed = true;
        });
        EventBus.removeListener('listener', 'event2');
        EventBus.emit('event2', 'data');
        assert.isFalse(changed);
    });

    it('allows to notify nodes directly', () => {
        let node = new EventNode();
        let id = EventBus.registerNode(node, 'node');

        EventBus.notify(id, new Event('event', 'nowhere', 'data'));
        assert.equal(node.data, 'data');
        assert.equal(node.name, 'event');
        assert.doesNotThrow(() => {
            EventBus.notify('noid');
        });
    });
});
