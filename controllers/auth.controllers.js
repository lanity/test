import user from "../models/user.model.js"
import bcrypt from "bcrypt"
import { createToken } from "../middlewares/auth.js"

export const getLogin = (req,res,next) => {
    res.render('login')
}

export const getRegister = (req,res) => {
    res.render('register')
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body

    const userInfo = await user.findOne({ email })

    let errorMessage

    if (!userInfo || userInfo === null) {

        errorMessage = 'Email yada Şifre Hatalidir !';
        return res.render('login', { errorMessage });

    } else {

        const comparePassword = await bcrypt.compare(password, userInfo.password)

        if (!comparePassword) {
        errorMessage = 'Email yada Şifre Hatalıdır !';
        return res.render('login', { errorMessage })
        } else {
            const token = createToken(userInfo._id)

            res.cookie('jwt', token, { httpOnly: true, maxAge: 2000000 });
            res.redirect('/admin')
        }
    }
}


export const postRegister = async (req, res) => {
    const { email, password } = req.body

    const userCheck = await user.findOne({ email });
    
    let errorMessage

    if (userCheck) {
        errorMessage = 'Girmiş Olduğunuz Email Kullanımda !'
        res.render('register', { errorMessage }); // Render ve ardından return ile fonksiyonu bitir
        return;
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const userSave = new user(req.body);

    await userSave.save()
        .then(() => {
            console.log("Kayıt Başarıyla Eklendi")
        })
        .catch(() => {
            console.log("Kullanıcı Kayıt Edilemedi !")
        });

    res.redirect('/'); 
    return;
}

export const logout = (req, res) => {
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/login")
  }


