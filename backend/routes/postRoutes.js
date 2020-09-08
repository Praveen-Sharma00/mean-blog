import express from 'express'
import multer from 'multer'

import postController from '../controllers/post-controller'

const router = express.Router()

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error('Invalid MIME type')
        if (isValid)
            error = null
        cb(error, "images/")
    },
    filename: function (eq, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-')
        const ext = MIME_TYPE_MAP[file.mimetype]
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})
router
    .route('/')
    .get(postController.getAllPosts)
    .post(multer({storage: storage}).single('image'), postController.addNewPost)

router
    .route('/:id')
    .put(multer({storage: storage}).single('image'),postController.editPost)
    .delete(postController.deletePost)

export default router
