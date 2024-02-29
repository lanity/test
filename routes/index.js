import express from "express"
const router = express.Router()
import { requireAuth } from "../middlewares/auth.js"
import auth from "./auth.routes.js"
import post from "./post.routes.js"
import user from "./user.routes.js"
import photo from "./photo.routes.js"
import {getPhotoPage} from "../controllers/photo.controllers.js"
import Post from "../models/post.model.js";
import redis from "redis"
import redisClient from "../db/redis.js"

router.use(auth)
router.use(post)
router.use(user)
router.use(photo)


router.get('/', async (req, res) => {
    const {page} = req.query
    const limit = 2;
    const skip = Number(page - 1) * limit
    try {
        const posts = await Post.find().populate('author', 'name').limit(limit).skip(skip)

        // Tüm gönderilerin toplam görüntülenme sayısını alın
        const totalViews = await Promise.all(posts.map(async post => {
            const slug = post.slug;
            const views = await redisClient.get("post:views:" + slug);
            return views;
        }));


        const totalPostsCount = await Post.countDocuments();
        const totalPages = Math.ceil(totalPostsCount / limit);
        req.totalPages = totalPages;

        res.status(200).render('index', {
            posts,
            views: totalViews,// Toplam görüntüleme sayısını gönderin
            totalPages,
            page
        });
    } catch (error) {
        console.error(error.message);
    }
});



router.get('/photos', getPhotoPage)

router.get('/about', (req,res) => {
    res.render('about')
})

router.get('/contact', (req,res) => {
    res.render('contact')
})

router.get('/admin', requireAuth, (req,res) => {
    res.render('admin', {
        layout: 'layouts/admin-layout'
    })
})




export default router