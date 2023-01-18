const express = require("express")
const router = express.Router()
const {createPost, getAllPosts, getPostsByUserId , upload , getPostsByPage} = require("../../controllers/postController")
const { sizeError } = require("../../middlewares/sizeError")


router.route("/")
    .get(getAllPosts)
    .post(upload ,sizeError,createPost)

router.route("/userPosts")
    .get(getPostsByUserId)

router.route("/page")
    .get(getPostsByPage)




module.exports = router