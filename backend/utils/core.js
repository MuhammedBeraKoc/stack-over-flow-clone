exports.is = Object.is
exports.type = v => typeof v
exports.isFunction = v => is(type(v), 'function')