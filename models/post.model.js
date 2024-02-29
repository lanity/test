import {mongoose, Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        default: "images/default_image.png",
        required: false
    },
    body: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        enum: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    slug: {
        type: String,
        unique: true
    },
    likes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
    ],
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    ]   
},{collection: "posts"})

const post = mongoose.model("posts",postSchema)

export default post