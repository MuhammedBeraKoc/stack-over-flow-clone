const { connection, connect } = require("../../repositories/mongodb")
const { MONGO_TEST_URL } = require("../../config")
const User = require('../../models/user')

describe('Test Suite for User Model', () => {
    beforeAll(async () => {
        await connect(MONGO_TEST_URL)
        await User.deleteMany({})
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        await connection.close()
    })

    it('has module User', () => {
        expect(User).toBeDefined()
    })

    it('should get the user', async () => {
        const user = new User({
            email: 'test@user.com',
            password: 'test1234$',
            username: 'testuser'
        })
        await user.save()
        const foundUser = await User.findOne({
            username: 'testuser'
        })
        const expected = 'testuser'
        const actual = foundUser.get('username')
        expect(expected).toEqual(actual)
    })

    it('should save the user', async () => {
        const user = new User({
            email: 'test@user.com',
            password: 'test1234$',
            username: 'testuser'
        })
        const savedUser = await user.save()
        const expected = 'testuser'
        const actual = savedUser.get('username')
        expect(expected).toEqual(actual)
    })
})