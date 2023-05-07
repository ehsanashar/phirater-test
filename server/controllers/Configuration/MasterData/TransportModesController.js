import mongoose from "mongoose"
import TransportMode from "../../../models/Configuration/MasterData/TransportMode.js"
import TransportModeTransformer from "./Transformers/TransportModeTransformer.js"


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

        const transportModes = await TransportMode.find(query)

        res.status(200).json(
            {
                'status': 200,
                'message': 'success',
                'data': TransportModeTransformer.transformCollection(transportModes)
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export const createTransportMode = async (req, res) => {
    const transportMode = req.body
    const newTransportMode = new TransportMode(transportMode)

    try {
        await newTransportMode.save()

        res.status(201).json(
            {
                'status': 201,
                'message': 'Transport mode added.',
                'data': TransportModeTransformer.transform(newTransportMode)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const updateTransportMode = async (req, res) => {
    const { id: _id } = req.params
    const transportMode = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Transport mode not found' })
        }

        const updateTransportMode = await TransportMode.findByIdAndUpdate(_id, transportMode, { new: true })

        res.status(201).json(
            {
                'status': 201,
                'message': 'Transport mode updated.',
                'data': TransportModeTransformer.transform(updateTransportMode)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const deleteTransportMode = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Transport mode not found' })
        }

        await TransportMode.findByIdAndDelete(_id);

        res.status(201).json(
            {
                'status': 201,
                'message': 'Transport mode deleted.',
                'data': []
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

export const setDefault = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Transport mode not found' })
        }

        await TransportMode.findOneAndUpdate(
            { 'is_default': true },
            { 'is_default': false }
        )

        await TransportMode.findByIdAndUpdate(_id, { is_default: true }, { new: true })

        res.status(201).json(
            {
                'status': 201,
                'message': 'Set default transport mode.',
                'data': []
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}


