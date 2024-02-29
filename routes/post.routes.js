import express from "express";
const router = express.Router()

import {addGetPost, addPostPost, gettAllPost, getDetailsPost, deleteGetPost, addPost1, like, addComment, searchPost} from "../controllers/post.controllers.js"
import upload from "../middlewares/lib/upload.js"

router.get("/admin/posts", gettAllPost)
router.get("/admin/posts/add-post", addGetPost)
router.post("/admin/posts/add-post", upload.single('postImage'), addPostPost)
router.get("/admin/posts/delete/:id", deleteGetPost)
router.get("/posts/:slug", getDetailsPost)
router.post("/posts/:postId/like", like)
router.post("/posts/:slug/addComment", addComment)
router.get("/posts/searchPost", searchPost)

router.get("/add-post", addPost1)

export default router