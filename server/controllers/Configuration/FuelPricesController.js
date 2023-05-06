import mongoose from "mongoose"
import FuelPrice from "../../models/Configuration/FuelPrice.js"
import FuelPriceTransformer from "./Transformers/FuelPriceTransformer.js"

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
                'message': 'success',
                'data': FuelPriceTransformer.transformCollection(fuelPrices)
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
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
                'message': 'Fuel Price added.',
                'data': FuelPriceTransformer.transform(newFuelPrice)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const updateFuelPrice = async (req, res) => {
    const { id: _id } = req.params
    const fuelPrice = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'fuel price not found' })
        }

        const updatedFuelPrice = await FuelPrice.findByIdAndUpdate(_id, fuelPrice, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'message': 'Fuel Price updated.',
                'data': FuelPriceTransformer.transform(updatedFuelPrice)
            }
        )
    } catch (error) {
        res.status(409).json({ 'message': error.message })
    }
}

export const deleteFuelPrice = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({ 'message': 'Fuel Price not found' })
        }

        await FuelPrice.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'message': 'Fuel Price deleted.',
                'data': []
            }
        )
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}
