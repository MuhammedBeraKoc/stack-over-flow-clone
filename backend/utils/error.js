/**
 * Normalises and error object enhancing it with toString method
 * @param {Error} error An error object
 * @returns Normalised enumerable error object
 */
exports.normaliseError = error => ({
    name: error.name,
    message: error.message,
    toString() {
        return `${this.name}: ${this.message}`
    }
})

exports.APIError = class extends Error {
    constructor(message, name="APIError") {
        super(message)
        this.name = name
    }
}

exports.parseError = (error, options={
    onlyMessage: true
}) => {
    return error.isJoi 
        ? (options.onlyMessage && error.details[0].message) || error.details[0]
        : JSON.stringify(error, options.onlyMessage 
            ? ['message']
            : Object.getOwnPropertyNames(error))
}