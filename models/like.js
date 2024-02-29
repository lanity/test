import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    postId: { 
        type: Schema.Types.ObjectId,
        ref: 'post' 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'user' 
    }
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
