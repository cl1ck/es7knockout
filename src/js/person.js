export default class Person {
    /**
     * create new Person with name
     * @param name
     */
    constructor(name) {
        this.name = name
    }

    /**
     * Returns the person's name
     * @returns {name}
     */
    name() {
        return this.name
    }
}
