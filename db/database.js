import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("database baglantisi yapildi");
    })
    .catch((err)=>{
        console.log("db is not connect");
    })

export default mongoose;