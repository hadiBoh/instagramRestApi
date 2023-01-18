const {addLike , deleteLike , getLikes} = require("../services/likeService")



const likeThePost = async (req , res)=>{
    const {userId , postId} = req.body
    const posts = await getLikes()
    const userLikedAlready = posts?.some(like => like.userId === userId && like.postId === postId)
    if(userLikedAlready) return res.status(400).json({message:"you have already liked!"})
    data = {userId, postId}
    try {
       const response = await addLike(data)
        return res.json(response)
    } catch (error) {
        return res.json(error)
    }
}

const getTheLikes = async (req , res)=>{

    try {
       const response = await getLikes()
        return res.json({likes:response})
    } catch (error) {
        return res.json(error)
    }
}

const deleteThePostLike = async (req , res)=>{
    const {postId , userId} = req.body
    const data = {postId , userId}
    try {
       const response = await deleteLike(data)
        return res.json({likes:response})
    } catch (error) {
        return res.json(error)
    }
}


module.exports = {
    likeThePost,
    getTheLikes,
    deleteThePostLike
}

