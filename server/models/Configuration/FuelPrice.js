import mongoose from "mongoose"

const fuelPriceSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    valid_from: {
        type: Date,
        required: true
    },
    valid_until: {
        type: Date,
        required: true
    },
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrier",
        required: true
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