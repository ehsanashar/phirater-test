import express from 'express'
import {
    findByCriteria,
    createFuelPrice,
    updateFuelPrice,
    deleteFuelPrice
} from "../../controllers/Configuration/FuelPricesController.js"

import Auth from "../../middleware/Auth.js"

const router = express.Router()

router.post('/findByCriteria', Auth, findByCriteria)
router.post('/createFuelPrice', Auth, createFuelPrice)
router.patch('/updateFuelPrice/:id', Auth, updateFuelPrice)
router.delete('/deleteFuelPrice/:id', Auth, deleteFuelPrice)

export default router