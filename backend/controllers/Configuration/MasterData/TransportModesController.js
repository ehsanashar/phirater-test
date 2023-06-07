import mongoose from "mongoose"
import TransportMode from "../../../models/Configuration/MasterData/TransportMode.js"
import TransportModeTransformer from "./Transformers/TransportModeTransformer.js"
import { FormatErrors } from "../../../utilities/ErrorFormatter.js"


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
                'messages': [],
                'data': TransportModeTransformer.transformCollection(transportModes),
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

export const createTransportMode = async (req, res) => {
    const transportMode = req.body
    const newTransportMode = new TransportMode(transportMode)

    try {
        await newTransportMode.save()

        res.status(201).json(
            {
                'status': 201,
                'messages': ['Transport mode added.'],
                'data': TransportModeTransformer.transform(newTransportMode),
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

export const updateTransportMode = async (req, res) => {
    const { id: _id } = req.params
    const transportMode = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Transport mode not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        const updateTransportMode = await TransportMode.findByIdAndUpdate(_id, transportMode, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Transport mode updated.'],
                'data': TransportModeTransformer.transform(updateTransportMode),
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

export const deleteTransportMode = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Transport mode not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await TransportMode.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Transport mode deleted.'],
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

export const setDefault = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Transport mode not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await TransportMode.findOneAndUpdate(
            { 'is_default': true },
            { 'is_default': false }
        )

        await TransportMode.findByIdAndUpdate(_id, { is_default: true }, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Set default transport mode.'],
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


