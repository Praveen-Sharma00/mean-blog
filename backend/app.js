import express from 'express'

import postRoutes from './routes/postRoutes'

const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/posts', postRoutes)

export default app
