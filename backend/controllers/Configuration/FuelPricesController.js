import mongoose from "mongoose"
import FuelPrice from "../../models/Configuration/FuelPrice.js"
import FuelPriceTransformer from "./Transformers/FuelPriceTransformer.js"
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

        const fuelPrices = await FuelPrice.find(query).populate('carrier')

        res.status(200).json(
            {
                'status': 200,
                'messages': [],
                'data': FuelPriceTransformer.transformCollection(fuelPrices),
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

export const createFuelPrice = async (req, res) => {
    const fuelPrice = req.body
    const newFuelPrice = new FuelPrice(fuelPrice)

    try {
        await newFuelPrice.save()

        res.status(201).json(
            {
                'status': 201,
                'messages': ['Fuel Price added.'],
                'data': FuelPriceTransformer.transform(newFuelPrice),
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

export const updateFuelPrice = async (req, res) => {
    const { id: _id } = req.params
    const fuelPrice = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Fuel price not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        const updatedFuelPrice = await FuelPrice.findByIdAndUpdate(_id, fuelPrice, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Fuel Price updated.'],
                'data': FuelPriceTransformer.transform(updatedFuelPrice),
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

export const deleteFuelPrice = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Fuel price not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await FuelPrice.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Fuel Price deleted.'],
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
