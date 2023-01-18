const db = require("../config/dbConnect")


const addComment = (data)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `INSERT INTO comments (postId , userId , comment , date) VALUES (?,?,?,?)`,
            [data.postId , data.userId , data.comment , data.date],
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
        )
    })
}

const fetchComments = ()=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT * FROM comments`,
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
        )
    })
}

const fetchCommentsByPostId = (id)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT * FROM comments WHERE postId = ?`,
            [id],
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
        )
    })
}


module.exports = {
    addComment,
    fetchComments,
    fetchCommentsByPostId
}