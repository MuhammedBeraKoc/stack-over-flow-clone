const { isFunction } = require("./core")

exports.injectContext = context => module => Object.keys(module).reduce((enhancedModule, key) => ({
    ...enhancedModule,
    [key]: (isFunction(module[key]) && module[key].bind(context)) || module[key]
}), {})