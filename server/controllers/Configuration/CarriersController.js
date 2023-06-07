import mongoose from "mongoose"
import Carrier from "../../models/Configuration/Carrier.js"
import CarrierTransformer from "./Transformers/CarrierTransformer.js"
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

        const carriers = await Carrier.find(query)

        res.status(200).json(
            {
                'status': 200,
                'messages': [],
                'data': CarrierTransformer.transformCollection(carriers),
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

export const createCarrier = async (req, res) => {
    const carrier = req.body
    const newCarrier = new Carrier(carrier)

    try {
        await newCarrier.save()

        res.status(201).json(
            {
                'status': 201,
                'messages': ['Carrier added.'],
                'data': CarrierTransformer.transform(newCarrier),
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

export const updateCarrier = async (req, res) => {
    const { id: _id } = req.params
    const carrier = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Carrier not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        const updateCarrier = await Carrier.findByIdAndUpdate(_id, carrier, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Carrier updated.'],
                'data': CarrierTransformer.transform(updateCarrier),
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

export const deleteCarrier = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json(res.status(404).json({
                'status': 404,
                'messages': ['Carrier not found.'],
                'data': [],
                'type': 'danger'
            }))
        }

        await Carrier.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Carrier deleted.'],
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
