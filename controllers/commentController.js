const { path } = require("path")

const {addComment , fetchComments, fetchCommentsByPostId} = require("../services/commentService")

const {sub} = require("date-fns")
const Comment = require("../models/comments")


const createComment = async (req , res)=>{
    const {postId , userId , comment } = req.body
    const date = sub(new Date() , {minutes:-210}).toISOString()

    const data = {post:postId , user:userId , comment , date}
    
    try {
        const response = await Comment.create(data)
        return res.json(response)
    } catch (error) {
        console.log(error);
       return res.status(400).json({message:error.message})
    }

}

const getAllComments = async (req , res)=>{

    try {
        const response = await Comment.find().lean()
        return res.json({comments:response})
    } catch (error) {
       return res.status(400).json({message:error.message})
    }

}

const getAllCommentsByPostId = async (req , res)=>{
    const {postId} = req.body

    try {
        const response = await Comment.find({post:postId}).lean()
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
