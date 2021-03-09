const is = Object.is
const type = v => typeof v
const isFunction = v => is(type(v), 'function')

module.exports = {
    is,
    type,
    isFunction
}