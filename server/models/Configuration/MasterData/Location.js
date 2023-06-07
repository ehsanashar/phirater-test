import mongoose from "mongoose"

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Field 'name' is required.`]
    },
    is_default: {
        type: Boolean,
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