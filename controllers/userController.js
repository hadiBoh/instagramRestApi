const {v4:uuid} = require('uuid')
const bcrypt = require("bcrypt")
const {create , allUsers , userById, updateById, updateBioById} = require("../services/userService")
const path = require("path")
const multer = require("multer")


const createUser = async (req , res)=>{
    const {username , password} = req.body

    if(username === "profile") return res.status(400).json({message:" this username is forbidden to use!"})
    if (!username || !password) return res.status(400).json({message:"username and password are required!"})
    const hashedPassword = await bcrypt.hash(password , 10)
    const data = {userId:uuid(), username , password:hashedPassword , bio:"" , profile:""}

    try {
        await create(data)
        return res.json({message:"user "+username+" created"})   
    } catch (error) {
        return res.status(400).json({message:error.message})   
    }

}
const getAllUsers = async (req , res)=>{

    try {
        const result = await allUsers()
        return res.json({users:result})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const getUserById = async (req , res)=>{
    const {userId} = req.body
    try {
        const result = await userById(userId)
        return res.json(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const updateUser = async (req , res)=>{

    const {userId} = req?.body

    const route = req?.file.path
    const newRoute = route?.replace("images" , "images/")
    const entries = {
        img:newRoute?.replace("profile" , "profile/")
    } 

    try {
        const result = await updateById(userId , entries)
        return res.json(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const updateUserBio = async (req , res)=>{

    const {userId , bio} = req?.body
    const entries = {
        bio
    } 
    try {
        const result = await updateBioById(userId , entries)
        return res.json(result)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}

const storage = multer.diskStorage({
    destination:(req , file ,cb)=>{
        cb(null , 'images/profile')
    },
    filename:(req , file , cb)=>{
        cb(null , Date.now()+path.extname(file.originalname))
    }
})
 
const upload = multer({
    storage:storage,
    limits:{fileSize:'500'},
    fileFilter:(req, file ,cb)=>{
        const fileType = /jpeg|jpg|png|gif/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if (mimeType && extname) {
            return cb(null,true)
        }
        cb('File size or type is inccorect')
    }
}).single('profile')




module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    upload,
    updateUserBio
}