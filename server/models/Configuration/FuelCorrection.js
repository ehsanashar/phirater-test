import mongoose from "mongoose"

const fuelCorrectionSchema = mongoose.Schema({
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrier",
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    correction: {
        type: Number,
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

const FuelCorrection = mongoose.model('FuelCorrection', fuelCorrectionSchema)

export default FuelCorrection