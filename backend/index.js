require = require('esm')(module)

require('dotenv').config({
    path: `./env/${process.env.NODE_ENV || 'development'}.env`
})

module.exports = require('./server')
