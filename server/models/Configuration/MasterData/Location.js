import mongoose from "mongoose"

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    is_default: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    },
    updated_at: {
        type: Date,
        default: new Date().toISOString()
    }
})

const Location = mongoose.model('Location', locationSchema)

export default Location