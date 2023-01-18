const express = require('express')
const app = express()
const PORT = 3500
require('dotenv').config()
const logger = require("./middlewares/logger")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const corsOptions = require("./config/corsOptions")
const verifyJWT = require("./middlewares/verifyJWT")
const {fileCreator} = require("./middlewares/fileCreator")
/* app.use(logger) */

/* app.use(cors(corsOptions)) */
app.use(cors())

app.use(cookieParser())

app.use(express.json())

app.use(fileCreator)

app.use("/images" , express.static("images"))


app.use("/login" , require("./api/routes/auth"))
app.use("/refresh" , require("./api/routes/auth"))
app.use("/logout" , require("./api/routes/logout"))

/* app.use(verifyJWT) */

app.use("/users" , require("./api/routes/users"))
app.use("/users/single" , require("./api/routes/users"))

app.use("/posts" , require("./api/routes/posts"))
app.use("/posts/userPosts" , require("./api/routes/posts"))

app.use("/comments" , require("./api/routes/comments"))
app.use("/comments/userComments" , require("./api/routes/comments"))

app.use("/likes" , require("./api/routes/likes"))


app.listen(PORT ,()=> console.log(`server running on port ${PORT}`))