const fs = require('fs')

exports.encodeBase64 = imageURL => {
    const bitmap = fs.readFileSync(imageURL)
    return Buffer.from(bitmap).toString('base64')
}