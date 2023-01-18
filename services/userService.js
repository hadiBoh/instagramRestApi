const db = require("../config/dbConnect")


const create = (data)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `INSERT INTO users (userId , username , password , bio , profile) values (?,?,?,?,?)`,
            [data.userId , data.username , data.password , data.bio , data.profile],
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
            )
    })
}
const allUsers = ()=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT userId , username , bio , profile FROM users`,
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
            )
    })
}

const userByUsername = (username)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT * FROM users WHERE username =?`,
            [username],
            (error , result , fields)=>{
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            }
            )
    })
}

const userById = (id)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `SELECT userId , username , bio , profile FROM users WHERE userId = ?`,
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

const updateById = (id ,newEntries)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `UPDATE users SET profile='${newEntries.img}' WHERE userId = ?`,
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

const updateBioById = (id ,newEntries)=>{
    return new Promise((resolve , reject)=>{
        db.query(
            `UPDATE users SET bio='${newEntries.bio}' WHERE userId = ?`,
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

module.exports ={
    create,
    allUsers,
    userById,
    userByUsername,
    updateById,
    updateBioById
}