const getAllPosts = (req, res) => {
    const posts = [
        {
            id: '2564wwwdwre',
            title: 'First server-side post',
            content: 'This is coming from server'
        },
        {
            id: 'sf25fweff',
            title: 'Second server-side post',
            content: 'This is coming from server'
        }
    ]

    return res.json({
        message: 'Success',
        data: posts
    })
}
const addNewPost = (req, res) => {
    let post = req.body
    console.log(post)
    return res.status(200).json({
        message: 'Post added successfully ',
        data: []
    })
}
export default {
    getAllPosts,
    addNewPost
}
