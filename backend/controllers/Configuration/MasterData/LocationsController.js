import mongoose from "mongoose"
import Location from "../../../models/Configuration/MasterData/Location.js"
import LocationTransformer from "./Transformers/LocationTransformer.js"
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

        const locations = await Location.find(query)

        res.status(200).json(
            {
                'status': 200,
                'messages': [],
                'data': LocationTransformer.transformCollection(locations),
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

export const createLocation = async (req, res) => {
    const location = req.body
    const newlocation = new Location(location)

    try {
        await newlocation.save()

        res.status(201).json(
            {
                'status': 201,
                'messages': ['Location added.'],
                'data': LocationTransformer.transform(newlocation),
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

export const updateLocation = async (req, res) => {
    const { id: _id } = req.params
    const location = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Location not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        const updatelocation = await Location.findByIdAndUpdate(_id, location, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Location updated.'],
                'data': LocationTransformer.transform(updatelocation),
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

export const deleteLocation = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Location not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await Location.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Location deleted.'],
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
                'messages': ['Location not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await Location.findOneAndUpdate(
            { 'is_default': true },
            { 'is_default': false }
        )

        await Location.findByIdAndUpdate(_id, { is_default: true }, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Set default Location.'],
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


