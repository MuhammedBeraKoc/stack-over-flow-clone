const { MONGO_URL, MONGO_TEST_URL } = require("../../config")

describe('Test Suite for User Model', () => {
    let originalMongoURL

    beforeAll(() => {
        originalMongoURL = MONGO_URL
        process.env.MONGO_URL = MONGO_TEST_URL
    })

    afterAll(() => {

    })
})