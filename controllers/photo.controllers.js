import Photo from "../models/photo.model.js"
import fs from "fs"

export const getPhotoPage = async (req,res) => {
    try {
        const photos = await Photo.find()

        res.render('photosPage', {
            photos
        })
    } catch (error) {
        console.log(error);
    }
}


export const getPhotos = async (req,res) => {
    try {
        const photos = await Photo.find()

        res.render('photos', {
            layout: 'layouts/admin-layout',
            photos: photos
        })

    } catch (error) {
        console.log(error);
    }
    
    
}

export const addGetPhoto = (req, res) => {
    res.render('photo-add', {
        layout: 'layouts/admin-layout',
    })
}

export const addPostPhoto = async (req, res) => {
    try {
        const { filename, originalname } = req.file;

        const newPhoto = new Photo({
            filename,
            originalname,
            user: res.locals.user._id,
        })
        await newPhoto.save()
        res.redirect("/admin/photos")
    } catch (error) {
        console.log(error);
    }
}

export const deleteGetPhoto = async (req, res) => {
    try {
        // Fotoğraf bilgisini veritabanından al
        const deletedPhoto = await Photo.findOneAndRemove({ _id: req.params.id });

        if (deletedPhoto) {
            // Veritabanından silinen fotoğrafın dosya adını veya yolunu al
            const filePath = deletedPhoto.filename; // Burada filename kullanıldığına göre, modelinize göre ayarlayabilirsiniz.

            // Sunucudan dosyayı sil
            fs.unlinkSync(`uploads/${filePath}`);
            console.log(`Dosya silindi: ${filePath}`);
        }

        res.status(200).redirect("/admin/photos");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}