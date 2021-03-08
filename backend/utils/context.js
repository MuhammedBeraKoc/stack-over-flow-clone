const { isFunction } = require("./core")

exports.injectContext = Context => module => {
    for (const key of module) {
        const value = module[key]
        if (isFunction(value)) {
            module[key] = value.bind(Context)
        }
    }
}