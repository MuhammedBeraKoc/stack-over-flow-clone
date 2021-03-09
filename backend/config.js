const { config } = require('dotenv')

config()

const {
    PORT,
    PROJECT_NAME,
    API_VERSION,
    NODE_ENV,
    MONGO_URL,
    MONGO_TEST_URL,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME
} = process.env

module.exports = {
    PORT,
    PROJECT_NAME,
    API_VERSION,
    NODE_ENV,
    MONGO_URL,
    MONGO_TEST_URL,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME
}