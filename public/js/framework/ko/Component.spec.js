import Component from './Component';
import ko from 'knockout';

class ParamTest extends Component {
    constructor(params) {
        super(params, 'test1', 'test2');
    }
}

class ComponentTest extends Component {
    constructor(params) {
        super(params);
        this.testCompBaseValue = 'testComp';
        this.importObservables();
        this.commonValue = 'value';
    }

    set testComp(value) {
        this.testCompBaseValue = value;
    }

    get testComp() {
        return this.testCompBaseValue;
    }
}

class EventTestParent extends Component {
    constructor(params) {
        super(params);
        this.test = 'value';
        this.stop = false;
        this.bubble = true;
        this.importObservables();
        this.on('testEvent', () => {
            this.test = 'changed';
        });
        this.on('stopEvent', (event) => {
            this.stop = true;
            event.stop();
        });
        this.on('noBubbleEvent', () => {
            this.bubble = false;
        });
    }

    sendEventToChild() {
        this.notify('child', 'parentEvent');
    }
}

class EventTestChild extends Component {
    constructor(params) {
        super(params);
        this.childvalue = 'child';
        this.importObservables();
        this.on('parentEvent', () => {
            this.childvalue = 'parent';
        });
    }

    sendTestEvent() {
        this.emit('testEvent');
    }

    sendStopEvent() {
        this.emit('stopEvent');
    }

    sendNoBubbleEvent() {
        this.emit('noBubbleEvent', {}, false);
    }
}

describe('Component', function() {
    it('requires an id', function() {
        let fn = function() {
            return new Component();
        };
        assert.throws(fn, 'each component must have an "id" param');
    });

    it('requires given parameters', function() {
        let fn = function() {
            return new ParamTest({
                id: 'myid'
            });
        };
        assert.throws(fn, 'required parameter "test1" is missing');
        fn = function() {
            return new ParamTest({
                id: 'myid',
                test1: 'test1'
            });
        };
        assert.throws(fn, 'required parameter "test2" is missing');
    });

    it('reads id from observables', function() {
        let comp = new Component({
            id: ko.observable('id')
        });
        assert.equal(comp._identifier, 'id');
    });

    it('imports common values', function() {
        let ext = new ComponentTest({
            id: 'ext'
        });

        let comp = new ComponentTest({
            id: 'myid',
            testvalue: 'value',
            importedValue: ext.commonValue
        });

        assert.equal(comp.testvalue, 'value');
        assert.equal(comp.$testvalue, undefined);
        assert.throws(function() {
            comp.testvalue = 'newvalue'
        });
        assert.equal(comp.importedValue, 'value');
        assert.equal(comp.$importedValue, undefined);
        assert.throws(function() {
            comp.importedValue = 'newvalue'
        });
    });

    it('imports observables', function() {
        let ext = new ComponentTest({
            id: 'ext'
        });

        let comp = new ComponentTest({
            id: 'myid',
            observable: ko.observable('obsvalue'),
            observableAsValue: ext.testCompBaseValue,
            importedObservable: ext.$testCompBaseValue
        });

        // observable
        assert.equal(comp.observable, 'obsvalue');
        assert.isTrue(ko.isObservable(comp.$observable));
        assert.equal(comp.$observable(), 'obsvalue');
        assert.doesNotThrow(function() {
            comp.observable = 'newValue'
        });

        // observable as value
        assert.equal(comp.observableAsValue, 'testComp');
        assert.equal(comp.$observableAsValue, undefined);
        assert.throws(function() {
            comp.observableAsValue = 1
        });

        // imported observable
        assert.equal(ext.testCompBaseValue, 'testComp');
        assert.equal(comp.importedObservable, 'testComp');
        assert.isTrue(ko.isObservable(comp.$importedObservable));
        assert.equal(comp.$importedObservable(), 'testComp');
        assert.doesNotThrow(function() {
            comp.importedObservable = 'newValue'
        });
        assert.equal(comp.importedObservable, 'newValue');
        assert.equal(comp.$importedObservable(), 'newValue');
        assert.equal(ext.testCompBaseValue, 'newValue');
    });

    it('imports pureComputed', function() {
        let ext = new ComponentTest({
            id: 'ext'
        });

        let comp = new ComponentTest({
            id: 'myid',
            computed: ko.pureComputed(function() {
                return 'test';
            }),
            computedAsValue: ext.testComp,
            importedComputed: ext.$testComp
        });

        // computed
        assert.isTrue(ko.isComputed(comp.$computed));
        assert.isTrue(ko.isComputed(comp.$importedComputed));
        assert.equal(comp.computed, 'test');
        assert.equal(comp.computedAsValue, 'testComp');
        assert.equal(comp.importedComputed, 'testComp');
        assert.throws(function() { comp.computed = 1});
        assert.throws(function() { comp.computedAsValue = 1});
        assert.doesNotThrow(function() { comp.importedComputed = 'newValue'});
        assert.equal(comp.importedComputed, 'newValue');
        assert.equal(ext.testComp, 'newValue');
    });

    it('imports and registers with parent components', function() {
        let child;
        let childError;
        let parent = new ComponentTest({
            id: 'parent',
            test: 'test',
            observable: 'observable'
        });
        assert.doesNotThrow(() => {
            child = new ComponentTest({
                id: 'child',
                parent: parent,
                test: 'test',
                observable: 'observable'
            });
        });
        assert.throws(() => {
            childError = new ComponentTest({
                id: 'childError',
                parent: 'test',
                test: 'test',
                observable: 'observable'
            });
        }, 'parent must be an instance of Component');
        assert.isTrue(parent.hasChildsWithId('child'));
        assert.isTrue(parent.hasChild(child._ID));
    });

    it('sends events to childs', function() {
        let parent = new EventTestParent({
            id: 'parent'
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });
        assert.equal(parent.test, 'value');
        child.sendTestEvent();
        assert.equal(parent.test, 'changed');
    });

    it('notifies childs by identifier', function() {
        let parent = new EventTestParent({
            id: 'parent'
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });
        let child2 = new EventTestChild({
            id: 'child2',
            parent: parent
        });
        assert.equal(child.childvalue, 'child');
        assert.equal(child2.childvalue, 'child');
        parent.sendEventToChild();
        assert.equal(child.childvalue, 'parent');
        assert.equal(child2.childvalue, 'child');
    });

    it('bubbles events to grandparents', function() {
        let grandparent = new EventTestParent({
            id: 'grandparent'
        });
        let parent = new EventTestParent({
            id: 'parent',
            parent: grandparent
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });
        // bubbling
        assert.equal(parent.test, 'value');
        assert.equal(grandparent.test, 'value');
        child.sendTestEvent();
        assert.equal(parent.test, 'changed');
        assert.equal(grandparent.test, 'changed');
    });

    it('does not bubbles events to grandparents if parent stops event', function() {
        let grandparent = new EventTestParent({
            id: 'grandparent'
        });
        let parent = new EventTestParent({
            id: 'parent',
            parent: grandparent
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });

        // stop at parent
        assert.equal(parent.stop, false);
        assert.equal(grandparent.stop, false);
        child.sendStopEvent();
        assert.equal(parent.stop, true);
        assert.equal(grandparent.stop, false);
    });

    it('bubbles events to parent but not grandparent if bubbling is disabled', function() {
        let grandparent = new EventTestParent({
            id: 'grandparent'
        });
        let parent = new EventTestParent({
            id: 'parent',
            parent: grandparent
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });

        assert.equal(parent.bubble, true);
        assert.equal(grandparent.bubble, true);
        child.sendNoBubbleEvent();
        assert.equal(parent.bubble, false);
        assert.equal(grandparent.bubble, true);
    });

    it('unregisters childs from parent on disposal', function() {
        let parent = new EventTestParent({
            id: 'parent'
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });

        assert.isTrue(parent.hasChild(child._ID));
        child.dispose();
        assert.isFalse(parent.hasChild(child._ID));
    });

    it('allows to register a component with knockoutjs', () => {
        let comp = new Component({
            id: 'test'
        });
        assert.isFalse(ko.components.isRegistered('test'));
        Component.registerComponent('test', comp, `test`);
        assert.isTrue(ko.components.isRegistered('test'));
        assert.isFalse(ko.components.isRegistered('test2'));
        Component.registerComponent('test2', null, `test`);
        assert.isTrue(ko.components.isRegistered('test2'));
    });
});
