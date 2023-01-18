const { resultOfSize } = require("../middlewares/sizeError")
const {addPost , fetchPosts, fetchUserPost} = require("../services/postService")
const {fetchComments} = require("../services/commentService")
const multer = require("multer")
const path = require("path")
const {getNewDate} = require("../middlewares/dataFormater")


const createPost = async(req , res)=>{

    const {userId , caption } = req.body
    const date = getNewDate()
    if(!userId) return res.status(400).json({message:"userId is required!"})

    const route = req?.file.path
    
    const cutRoute = route.substr(15)
    

    data = {userId , caption ,img:`images/postImg/${cutRoute}` , date}

    try {
        const response = await addPost(data)
        const posts = await fetchPosts()
        const post = posts.find(post=> post.postId === response?.insertId)
        return res.json(post)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const getAllPosts = async(req , res)=>{
    try {
        const response = await fetchPosts()
        const allComments = await fetchComments()
        
        let newData = response.map(post=>{
            const filterdComments = allComments.filter(comment => comment.postId === post.postId)
            post.comments = filterdComments
            return post
        })
        
        res.json({length:response.length})
    } catch (error) {
        res.json({message:error.message})
    }
}

const pageAmount = 5

const getPostsByPage = async(req , res)=>{
    const {page} = req.query
    const posts = await fetchPosts()
    const end = page*pageAmount-1
    const start = page*pageAmount-pageAmount
    const sorted = posts.sort((a,b)=> b.date.localeCompare(a.date))
    const filtered = sorted.filter((post , i)=> {

        if(i <= end && i>=start){
            return post
        }  
    })
    return res.json({filtered ,length: posts.length})
}

const getPostsByUserId = async(req , res)=>{

    const {userId} = req.body

    try {
        const response = await fetchUserPost(userId)
        res.json(response)
    } catch (error) {
        res.json({message:error.message})
    }
}


const storage = multer.diskStorage({
    
    destination:(req , file ,cb)=>{
        cb(null , 'images/postImg')
    },
    filename:(req , file , cb)=>{
        cb(null , Date.now()+path.extname(file.originalname))
    }
})
 
const upload = multer({
    storage:storage,
    limits:{fileSize:'1000000'},
    fileFilter:(req, file ,cb)=>{
        const fileType = /jpeg|jpg|png|gif|JPG|JPEG|PNG|GIF/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if (mimeType && extname) {

            return cb(null,true)
        }

        return cb("file size or ext!" , true)
    }
}).single('postImg')


module.exports = {
    createPost,
    getAllPosts,
    getPostsByUserId,
    upload,
    getPostsByPage
}