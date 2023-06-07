import mongoose from "mongoose"

const carrierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Field 'name' is required.`]
    },
    country: {
        type: String,
        required: [true, `Field 'country' is required.`]
    },
    address: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    postal_code: {
        type: String,
        default: null
    },
    vat: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    currency: {
        type: String,
        default: null,
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

const Carrier = mongoose.model('Carrier', carrierSchema)

export default Carrier