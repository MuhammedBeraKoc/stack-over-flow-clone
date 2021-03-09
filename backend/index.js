const { connect } = require('./repositories/mongodb')
const initApp = require("./app");

const main = async (mongoURL) => {
    await connect(mongoURL)
    await initApp()
}

main()