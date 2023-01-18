const db = require("../config/dbConnect")



const addLike = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO likes (userId , postId) VALUES (?,?)`,
            [data.userId, data.postId],
            (error, result, feilds) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
        )
    })
}

const getLikes = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM likes`,
            (error, result, feilds) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
        )
    })
}

const deleteLike = (ids) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM likes WHERE postId = ? AND userId = ?`,
            [ids.postId , ids.userId],
            (error, result, feilds) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
        )
    })

}

module.exports = {
    addLike,
    getLikes,
    deleteLike
}