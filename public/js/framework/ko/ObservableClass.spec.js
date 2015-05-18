import ObservableClass from './ObservableClass';
import ko from 'knockout';
let assert = chai.assert;

class ImportTest extends ObservableClass {
    constructor() {
        super();
        this.stringProperty = 'value';
        this.arrayProperty = [];
        this.intProperty = 3;
        this.undefinedProperty = undefined;
        this.nullProperty = null;
        this.objectProperty = { test: 'test '};
        this.trueProperty = true;
        this.falseProperty = false;
        this._ignoredProperty = 'test';
        this.$ignoredProperty = 'test';
        this.importObservables();
        this.noObservable = '';
    }

    get computedProperty() {
        return this.stringProperty + this.stringProperty;
    }
}

describe('ObservableClass', function() {
    it('should import all properties as observable', function() {
        let importTest = new ImportTest();
        assert.isTrue(ko.isObservable(importTest.$stringProperty));
        assert.isTrue(ko.isObservable(importTest.$arrayProperty));
        assert.isTrue(ko.isObservable(importTest.$intProperty));
        assert.isTrue(ko.isObservable(importTest.$undefinedProperty));
        assert.isTrue(ko.isObservable(importTest.$nullProperty));
        assert.isTrue(ko.isObservable(importTest.$objectProperty));
        assert.isTrue(ko.isObservable(importTest.$trueProperty));
        assert.isTrue(ko.isObservable(importTest.$falseProperty));
    });

    it('should not import properties after importObservables', function() {
        let importTest = new ImportTest();
        assert.equal(importTest.$noObservable, undefined);
    });

    it('should import arrays as observableArray', function() {
        let importTest = new ImportTest();
        assert.equal(typeof importTest.$arrayProperty.removeAll, 'function');
    });

    it('should maintain read and write access to properties', function() {
        let importTest = new ImportTest();
        importTest.stringProperty = 'newValue';
        assert.equal(importTest.stringProperty, 'newValue');
    });

    it('should update the underlying observable', function() {
        let importTest = new ImportTest();
        importTest.stringProperty = 'newValue';
        assert.equal(importTest.$stringProperty(), 'newValue');
    });

    it('should ignore variables with prefix $ or _', () => {
        let importTest = new ImportTest();
        assert.equal(importTest.$ignoredProperty, 'test');
        assert.equal(importTest._ignoredProperty, 'test');
        assert.isFalse(ko.isObservable(importTest.$ignoredProperty));
        assert.isFalse(ko.isObservable(importTest._ignoredProperty));
    });

    it('should import getters as pureComputed', () => {
        let importTest = new ImportTest();
        assert.equal(importTest.computedProperty, 'valuevalue');
        assert.isTrue(ko.isComputed(importTest.$computedProperty));
        importTest.stringProperty = 'test';
        assert.equal(importTest.computedProperty, 'testtest');
    })
});
