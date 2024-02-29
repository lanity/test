import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: { 
        type: Schema.Types.ObjectId,
        ref: 'post' 
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user' 
    },
    slug: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    comment: {
        type: String,
        required: true,
    }
});

const comment = mongoose.model('Comment', commentSchema);

export default comment;