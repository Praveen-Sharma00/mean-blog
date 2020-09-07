import express from 'express'

import postController from '../controllers/post-controller'

const router = express.Router()

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.addNewPost)

export default router
