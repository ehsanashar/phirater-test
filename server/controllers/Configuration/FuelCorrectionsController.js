import mongoose from "mongoose"
import FuelCorrection from "../../models/Configuration/FuelCorrection.js"
import FuelCorrectionTransformer from "./Transformers/FuelCorrectionTransformer.js"
import { FormatErrors } from "../../utilities/ErrorFormatter.js"

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
                'messages': [],
                'data': FuelCorrectionTransformer.transformCollection(fuelCorrections),
                'type': 'success'
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'messages': FormatErrors(error.errors),
            'data': [],
            'type': 'danger'
        })
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
                'messages': ['Fuel Correction added.'],
                'data': FuelCorrectionTransformer.transform(newfuelCorrection),
                'type': 'success'
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'messages': FormatErrors(error.errors),
            'data': [],
            'type': 'danger'
        })
    }
}

export const updateFuelCorrection = async (req, res) => {
    const { id: _id } = req.params
    const fuelCorrection = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Fuel correction not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        const updatedFuelCorrection = await FuelCorrection.findByIdAndUpdate(_id, fuelCorrection, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': 'Fuel Correction updated.',
                'data': FuelCorrectionTransformer.transform(updatedFuelCorrection),
                'type': 'success'
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'status': 500,
            'messages': FormatErrors(error.errors),
            'data': [],
            'type': 'danger'
        })
    }
}

export const deleteFuelCorrection = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Fuel correction not found.'],
                'data': []
            })
        }

        await FuelCorrection.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'messages': 'Fuel Correction deleted.',
                'data': [],
                'type': 'success'
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'messages': FormatErrors(error.errors),
            'data': [],
            'type': 'danger'
        })
    }
}
