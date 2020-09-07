import Post from "../models/post";
import logger from "../logger";

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        logger.info("Post fetched successfully")
        return res.json({
            message: 'Success',
            data: posts
        })
    } catch (e) {
        logger.error('Failed to fetch posts !')
        return res.status(400).json({
            message: 'Could not fetch posts ! Try again...',
            data: []
        })
    }
}
const addNewPost = async (req, res) => {
    let post = req.body
    let addedPost = {}
    try {
        addedPost = await Post.create(post)
        logger.info('Post created !')
        return res.status(200).json({
            message: 'Post added successfully ',
            data: addedPost
        })
    } catch (e) {
        logger.error('Post creation failed !')
        return res.status(400).json({
            message: 'Could not add post ! Try again...',
            data: []
        })
    }
}

const deletePost = async (req, res) => {
    let postId = req.params.id

    try {
        await Post.deleteOne({_id: postId})
        logger.info('Post deleted !')
        return res.status(200).json({
            message: 'Post deleted successfully ',
            data: []
        })
    } catch (e) {
        logger.error('Post deletion failed !')
        return res.status(400).json({
            message: 'Could not delete post ! Try again...',
            data: []
        })
    }
}
export default {
    getAllPosts,
    addNewPost,
    deletePost
}
