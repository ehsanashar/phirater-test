import mongoose from "mongoose"

const fuelCorrectionSchema = mongoose.Schema({
    carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrier",
        required: [true, `Field 'carrier' is required.`]
    },
    from: {
        type: Number,
        required: [true, `Field 'from' is required.`]
    },
    to: {
        type: Number,
        required: [true, `Field 'to' is required.`]
    },
    correction: {
        type: Number,
        required: [true, `Field 'correction' is required.`]
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