import Person from '../js/person'
let assert = chai.assert

describe('Person', function() {
    it('should return his name', function() {
        var person = new Person('test')
        assert.equal(person.name, 'test')
    })
})
