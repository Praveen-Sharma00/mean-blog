import express from 'express'

import postController from '../controllers/post-controller'

const router = express.Router()

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.addNewPost)

router
    .route('/:id')
    .delete(postController.deletePost)

export default router
