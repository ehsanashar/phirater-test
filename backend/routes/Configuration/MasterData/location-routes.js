import express from 'express'
import {
    createLocation,
    updateLocation,
    findByCriteria,
    deleteLocation,
    setDefault
} from '../../../controllers/Configuration/MasterData/LocationsController.js'
import Auth from "../../../middleware/Auth.js"

const router = express.Router()

router.post('/findByCriteria', Auth, findByCriteria)
router.post('/createLocation', Auth, createLocation)
router.patch('/updateLocation/:id', Auth, updateLocation)
router.delete('/deleteLocation/:id', Auth, deleteLocation)
router.post('/setDefault/:id', Auth, setDefault)

export default router