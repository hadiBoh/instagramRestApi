const { path } = require("path")

const {addComment , fetchComments, fetchCommentsByPostId} = require("../services/commentService")

const {sub} = require("date-fns")



const createComment = async (req , res)=>{
    const {postId , userId , comment } = req.body
    const date = sub(new Date() , {minutes:-210}).toISOString()

    const data = {postId , userId , comment , date}

    try {
        const response = await addComment(data)
        return res.json(response)
    } catch (error) {
       return res.status(400).json({message:error.message})
    }

}

const getAllComments = async (req , res)=>{

    try {
        const response = await fetchComments()
        return res.json({comments:response})
    } catch (error) {
       return res.status(400).json({message:error.message})
    }

}

const getAllCommentsByPostId = async (req , res)=>{
    const {postId} = req.body

    try {
        const response = await fetchCommentsByPostId(postId)
        return res.json(response)
    } catch (error) {
       return res.status(400).json({message:error.message})
    }

}


module.exports = {
    createComment,
    getAllComments,
    getAllCommentsByPostId
}
