import http from 'http'

import mongoose from 'mongoose'

import logger from './logger'
import app from './app'


(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('DB Connection established !')
    } catch (e) {
        logger.error('DB Connection failed !')
    }
})()

const server = http.createServer(app)

process.on('uncaughtException', uncaughtException => {
    logger.error(
        'Uncaught Exception at: %s - message: %s',
        uncaughtException.stack,
        uncaughtException.message
    );
});

process.on('unhandledRejection', reason => {
    logger.error('Unhandled Rejection at: %s - message: %s', reason.stack, reason.message);
});

const port = parseInt(process.env.SERVER_PORT, 10)

server.listen(port, () => {
    logger.info("Server running on PORT : %d", port)
})


