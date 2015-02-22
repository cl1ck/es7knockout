import Person from 'src/js/person';
var assert = chai.assert;

describe('Person', function() {
    describe('add', function() {
        it('should return his name', function() {
            assert.equal(new Person('test').name, 'test');
        });
    });
});
