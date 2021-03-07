const fs = require('fs')

exports.encodeBase64 = imageURL => {
    const bitmap = fs.readFileSync(imageURL)
    return Buffer.from(bitmap).toString('base64')
}

exports.sessionizeUser = user => ({
    userId: user.id,
    username: user.username
})

exports.parseError = (error, options={
    onlyMessage: true
}) => {
    return error.isJoi ? (options.onlyMessage && error.details[0].message) || error.details[0] : JSON.stringify(error, options.onlyMessage ? ['message']: Object.getOwnPropertyNames(error))
}