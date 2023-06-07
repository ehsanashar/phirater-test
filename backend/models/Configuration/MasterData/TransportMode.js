import mongoose from "mongoose"

const transportModeSchema = mongoose.Schema({
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

const TransportMode = mongoose.model('TransportMode', transportModeSchema)

export default TransportMode