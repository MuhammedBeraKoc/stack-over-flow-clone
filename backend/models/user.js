const { Schema, model } = require('mongoose')
const { hashSync, compareSync } = require('bcryptjs')
const { encodeBase64 } = require('../utils/core')
const { passwordRegex, passwordErrorMessage } = require('../validations/user')
const iconURL = './models/user.png'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: username => User.doesNotExist(username),
            message: props => `${props.value} is already recorded in database`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: password => passwordRegex.test(password),
            message: passwordErrorMessage
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: email => User.doesNotExist(email),
            message: props => `${props.value} already exists in database`
        }
    },
    icon: {
        type: Buffer,
        default: encodeBase64(iconURL),
        required: true
    },
    reputation: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

userSchema.pre('save', function() {
    const path = 'password'
    if (this.isModified(path)) {
        const hashedPassword = hashSync(this.get(path))
        this.set(path, hashedPassword)
    }
})

userSchema.static('doesNotExist', function(field) {
    return this.where({ field }).countDocuments() === 0
})

userSchema.method('comparePasswords', function(password) {
    return compareSync(password, this.get('password'))
})

const User = model('user', userSchema)

module.exports = User