import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [String],
    selectedFile: String,
    likes: {
        type: [mongoose.Types.ObjectId],
        default: [] 
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post