const db = require("../config/dbConnect")

const addPost = (data)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `INSERT INTO posts (userId , caption , img , date ) values (?,?,?,?)`,
            [data.userId , data.caption , data.img , data.date],
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
            )
    })
}

const fetchPosts = ()=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT * FROM posts `,
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
            )
    })
}

const fetchUserPost = (id)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT * FROM posts WHERE userId = ?`,
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
    addPost,
    fetchPosts,
    fetchUserPost
}