import mongoose from "mongoose"

const fuelPriceSchema = mongoose.Schema({
    price: {
        type: Number,
        required: [true, `Field 'price' is required.`]
    },
    valid_from: {
        type: Date,
        required: [true, `Field 'valid from' is required.`]
    },
    valid_until: {
        type: Date,
        required: [true, `Field 'valid until' is required.`]
    },
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrier",
        required: [true, `Field 'carrier' is required.`]
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

const FuelPrice = mongoose.model('FuelPrice', fuelPriceSchema)

export default FuelPrice