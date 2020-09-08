import Post from '../models/post';
import logger from '../logger';

const getAllPosts = async (req, res) => {
  const pageSize = req.query.pageSize;
  const currentPage = req.query.page;
  let findQuery = Post.find({});

  if (pageSize && currentPage) {
    findQuery.skip(pageSize * 1 * (currentPage * 1 - 1)).limit(pageSize * 1);
  }
  try {
    const posts = await findQuery;
    const count = await Post.countDocuments();
    logger.info('Post fetched successfully');
    return res.json({
      message: 'Success',
      data: {
        posts: posts,
        maxPosts: count,
      },
    });
  } catch (e) {
    logger.error('Failed to fetch posts !');
    return res.status(400).json({
      message: 'Could not fetch posts ! Try again...',
      data: [],
    });
  }
};
const addNewPost = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  let post = {
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
  };
  let addedPost = {};
  try {
    addedPost = await Post.create(post);
    logger.info('Post created !');
    return res.status(200).json({
      message: 'Post added successfully ',
      data: {
        id: addedPost._id,
        title: post.title,
        content: post.content,
        imagePath: post.imagePath,
      },
    });
  } catch (e) {
    logger.error('Post creation failed !');
    return res.status(400).json({
      message: 'Could not add post ! Try again...',
      data: [],
    });
  }
};
const editPost = async (req, res) => {
  let postId = req.params.id;
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  let post = { title: req.body.title, content: req.body.content, imagePath: imagePath };
  try {
    await Post.updateOne({ _id: postId }, post);
    logger.info('Post updated !');
    return res.status(200).json({
      message: 'Post updated successfully ',
      data: [],
    });
  } catch (e) {
    logger.error('Post updation failed !');
    return res.status(400).json({
      message: 'Could not update post ! Try again...',
      data: [],
    });
  }
};
const deletePost = async (req, res) => {
  let postId = req.params.id;

  try {
    await Post.deleteOne({ _id: postId });
    logger.info('Post deleted !');
    return res.status(200).json({
      message: 'Post deleted successfully ',
      data: [],
    });
  } catch (e) {
    logger.error('Post deletion failed !');
    return res.status(400).json({
      message: 'Could not delete post ! Try again...',
      data: [],
    });
  }
};
export default {
  getAllPosts,
  addNewPost,
  deletePost,
  editPost,
};
