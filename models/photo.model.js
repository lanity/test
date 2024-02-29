import mongoose, { Schema } from "mongoose";

const photoSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
},{collection: "photos"})

const photo = mongoose.model("photos",photoSchema)

export default photo