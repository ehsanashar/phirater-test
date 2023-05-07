import mongoose from "mongoose"
import Location from "../../../models/Configuration/MasterData/Location.js"
import LocationTransformer from "./Transformers/LocationTransformer.js"


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
                'message': 'success',
                'data': LocationTransformer.transformCollection(locations)
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
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
                'message': 'Location added.',
                'data': LocationTransformer.transform(newlocation)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const updateLocation = async (req, res) => {
    const { id: _id } = req.params
    const location = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Location not found' })
        }

        const updatelocation = await Location.findByIdAndUpdate(_id, location, { new: true })

        res.status(201).json(
            {
                'status': 201,
                'message': 'Location updated.',
                'data': LocationTransformer.transform(updatelocation)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const deleteLocation = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Location not found' })
        }

        await Location.findByIdAndDelete(_id);

        res.status(201).json(
            {
                'status': 201,
                'message': 'Location deleted.',
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
            res.status(404).json({ 'message': 'Location not found' })
        }

        await Location.findOneAndUpdate(
            { 'is_default': true },
            { 'is_default': false }
        )

        await Location.findByIdAndUpdate(_id, { is_default: true }, { new: true })

        res.status(201).json(
            {
                'status': 201,
                'message': 'Set default Location.',
                'data': []
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}


