import express from 'express'
import {
    createTransportMode,
    updateTransportMode,
    findByCriteria,
    deleteTransportMode,
    setDefault
} from '../../../controllers/Configuration/MasterData/TransportModesController.js'
import Auth from "../../../middleware/Auth.js"

const router = express.Router()

router.post('/findByCriteria', Auth, findByCriteria)
router.post('/createTransportMode', Auth, createTransportMode)
router.patch('/updateTransportMode/:id', Auth, updateTransportMode)
router.delete('/deleteTransportMode/:id', Auth, deleteTransportMode)
router.post('/setDefault/:id', Auth, setDefault)

export default router