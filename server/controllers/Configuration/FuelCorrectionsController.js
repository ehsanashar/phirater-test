import mongoose from "mongoose"
import FuelCorrection from "../../models/Configuration/FuelCorrection.js"
import FuelCorrectionTransformer from "./Transformers/FuelCorrectionTransformer.js"

export const findByCriteria = async (req, res) => {
    const criteria = req.body
    try {
        let query = {}

        if (criteria.length > 0) {
            criteria.map(cr => {
                if (cr.value !== '') {
                    query[cr.key] = cr.value
                }
            })
        }

        const fuelCorrections = await FuelCorrection.find(query).populate('carrier')

        res.status(200).json(
            {
                'status': 200,
                'message': 'success',
                'data': FuelCorrectionTransformer.transformCollection(fuelCorrections)
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export const createFuelCorrection = async (req, res) => {
    const fuelCorrection = req.body
    const newfuelCorrection = new FuelCorrection(fuelCorrection)

    try {
        await newfuelCorrection.save()

        res.status(201).json(
            {
                'status': 201,
                'message': 'Fuel Correction added.',
                'data': FuelCorrectionTransformer.transform(newfuelCorrection)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const updateFuelCorrection = async (req, res) => {
    const { id: _id } = req.params
    const fuelCorrection = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'fuel correction not found' })
        }

        const updatedFuelCorrection = await FuelCorrection.findByIdAndUpdate(_id, fuelCorrection, { new: true })

        res.status(201).json(
            {
                'status': 201,
                'message': 'Fuel Correction updated.',
                'data': FuelCorrectionTransformer.transform(updatedFuelCorrection)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const deleteFuelCorrection = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Fuel Correction not found' })
        }

        await FuelCorrection.findByIdAndDelete(_id);

        res.status(201).json(
            {
                'status': 201,
                'message': 'Fuel Correction deleted.',
                'data': []
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}
