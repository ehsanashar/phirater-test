import express from 'express'
import {
    findByCriteria,
    createFuelCorrection,
    updateFuelCorrection,
    deleteFuelCorrection
} from "../../controllers/Configuration/FuelCorrectionsController.js"

import Auth from "../../middleware/Auth.js"

const router = express.Router()

router.post('/findByCriteria', Auth, findByCriteria)
router.post('/createFuelCorrection', Auth, createFuelCorrection)
router.patch('/updateFuelCorrection/:id', Auth, updateFuelCorrection)
router.delete('/deleteFuelCorrection/:id', Auth, deleteFuelCorrection)

export default router