const sinon = require('sinon')
const Mongo = require('../../repositories/mongodb')
const { createMockRequest } = require('../../utils/mock')
const UserService = require('../user')

describe('User Service Test Suite', () => {
    it('has a module', () => {
        expect(UserService).toBeDefined()
    })

    it('should save the user', async () => {
        let username, email, password, session
        const userService = UserService(null)
        const MockRequest = createMockRequest({
            username: 'testuser',
            email: 'test@user.com',
            password: 'user1234#'
        })
        const save = sinon.spy(Mongo.users, 'save')
        await userService.save(MockRequest)
        save.restore()
        sinon.assert.calledOnce(save)
    })
})