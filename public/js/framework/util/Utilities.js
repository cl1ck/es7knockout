export function isArray(varToTest) {
    return Object.prototype.toString.call(varToTest) === '[object Array]'
}
