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

export default {
    getAllPosts
}
