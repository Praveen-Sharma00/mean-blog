import http from 'http'

import logger from './logger'
import app from './app'

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

const port = parseInt(process.env.SERVER_PORT,10)

server.listen(port, () => {
    logger.info("Server running on PORT : %d",port)
})


