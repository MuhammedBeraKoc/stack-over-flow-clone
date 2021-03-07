const Joi = require('joi')

const email = Joi.string().email().required()
const username = Joi.string().min(3).max(30).required()
const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,16}$/
const passwordErrorMessage = 
    'must be between 6-16 characters, ' +
    'have at least one capital letter, ' +
    'one lowercase letter, one digit, ' +
    'and one special character'
const password = Joi.string().regex(passwordRegex).options({
    messages: {
        'string.pattern.base': passwordErrorMessage
    }
})
const signUp = Joi.object({
    email,
    username,
    password
})

const login = Joi.object({
    email,
    password
})

module.exports = {
    passwordRegex,
    passwordErrorMessage,
    signUp,
    login
}