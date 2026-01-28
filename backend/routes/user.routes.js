const express = require('express')
const { registerUser, loginUser, allPost, dashboard, newPost, findUser, updateUser, userPost, updatePost, deletePost } = require('../controllers/authUser.controllers')
const { isLoggedin } = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/allpost',allPost)
router.get('/dashboard',isLoggedin,dashboard)
router.post('/newPost',newPost)
router.get('/findUser',findUser)
router.post('/updateUser',updateUser)
router.get('/userpost',userPost)
router.post('/updatePost',updatePost)
router.delete('/delete/:id',deletePost)

module.exports = router