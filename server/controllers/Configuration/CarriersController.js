import mongoose from "mongoose"
import Carrier from "../../models/Configuration/Carrier.js"
import CarrierTransformer from "./Transformers/CarrierTransformer.js"


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

        const carriers = await Carrier.find(query)

        res.status(200).json(
            {
                'status': 200,
                'message': 'success',
                'data': CarrierTransformer.transformCollection(carriers)
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': error.message,
            'data': []
        })
    }
}

export const createCarrier = async (req, res) => {
    const carrier = req.body
    const newCarrier = new Carrier(carrier)

    try {
        await newCarrier.save()

        res.status(201).json(
            {
                'status': 201,
                'message': 'Carrier added.',
                'data': CarrierTransformer.transform(newCarrier)
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': error.message,
            'data': []
        })
    }
}

export const updateCarrier = async (req, res) => {
    const { id: _id } = req.params
    const carrier = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'carrier not found' })
        }

        const updateCarrier = await Carrier.findByIdAndUpdate(_id, carrier, { new: true })

        res.status(201).json(
            {
                'status': 201,
                'message': 'Carrier updated.',
                'data': CarrierTransformer.transform(updateCarrier)
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': error.message,
            'data': []
        })
    }
}

export const deleteCarrier = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'carrier not found' })
        }

        await Carrier.findByIdAndDelete(_id);

        res.status(201).json(
            {
                'status': 201,
                'message': 'Carrier deleted.',
                'data': []
            }
        )
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': error.message,
            'data': []
        })
    }
}
