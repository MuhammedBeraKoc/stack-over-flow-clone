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
    contructor(message, name="APIError") {
        super(message)
        this.name = name
    }
}