import express from 'express'
import { findByCriteria, createCarrier, updateCarrier, deleteCarrier } from "../../controllers/Configuration/CarriersController.js"

import Auth from "../../middleware/Auth.js"

const router = express.Router()

router.post('/findByCriteria', Auth, findByCriteria)
router.post('/createCarrier', Auth, createCarrier)
router.patch('/updateCarrier/:id', Auth, updateCarrier)
router.delete('/deleteCarrier/:id', Auth, deleteCarrier)

export default router