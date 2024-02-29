import User from "../models/user.model.js"

export const getUserList = async( req, res) => {
    let errorMessages;

    try {
         const users = await User.find();

         res.render('user-list', {
            layout: 'layouts/admin-layout',
            errorMessages,
            users})
        
    } catch (error) {
        errorMessages = 'Kullanicilari listeleyemedik';
    }

}

export const getEditUser = async (req,res) => {
    let errorMessages;

    try {
         const users = await User.findOne({ _id: req.params.id });

         res.render('user-edit', {
            layout: 'layouts/admin-layout',
            errorMessages,
            users})
        
    } catch (error) {
        errorMessages = 'Kullaniciyi guncelleyemedik!';
    }
}

export const putEditUser = async (req,res) => {
    try {

        await User.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email
        });
    
        res.redirect(`/admin/users`);
    
      } catch (error) {
        console.log(error);
      }

}

export const deleteUser = async (req,res) => {
    try {
      await User.deleteOne( {_id: req.params.id} )
      res.redirect('/admin/users')
    } catch (error) {
      console.log(error);
    }
}