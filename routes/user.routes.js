import express from "express";
const router = express.Router()
import { requireAuth } from "../middlewares/auth.js";

import {getUserList, putEditUser, getEditUser, deleteUser} from "../controllers/user.controllers.js"

router.get("/admin/users", requireAuth, getUserList)
router.get("/users/edit/:id", requireAuth, getEditUser)
router.put("/users/edit/:id", requireAuth, putEditUser)
router.delete("/users/delete/:id", requireAuth, deleteUser)

export default router