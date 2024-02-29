import express from "express";
const router = express.Router()

import {getLogin,getRegister, logout, postLogin, postRegister} from "../controllers/auth.controllers.js"

import authValidation from "../middlewares/validation/auth.validations.js"
import { isLoggedin } from "../middlewares/auth.js"

router.get("/login",isLoggedin, getLogin)
router.get("/register", getRegister)
router.post("/login",authValidation.login, postLogin)
router.post("/register", authValidation.register, postRegister)
router.get("/logout", logout)

export default router