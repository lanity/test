import express from "express";
const router = express.Router()
import { getPhotos, addGetPhoto, addPostPhoto, deleteGetPhoto } from "../controllers/photo.controllers.js"
import { requireAuth } from "../middlewares/auth.js";
import upload from "../middlewares/lib/upload.js";


router.get("/admin/photos", requireAuth, getPhotos)
router.get("/admin/add-photo", requireAuth, addGetPhoto)
router.post("/admin/add-photo", requireAuth, upload.single('photo') ,addPostPhoto)
router.get("/admin/delete-photo/:id", requireAuth, deleteGetPhoto)

export default router