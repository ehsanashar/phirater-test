import express from 'express'
import {
    createCategory,
    updateCategory,
    findByCriteria,
    deleteCategory,
    setDefault
} from '../../../controllers/Configuration/MasterData/CategoriesController.js'
import Auth from "../../../middleware/Auth.js"

const router = express.Router()

router.post('/findByCriteria', Auth, findByCriteria)
router.post('/createCategory', Auth, createCategory)
router.patch('/updateCategory/:id', Auth, updateCategory)
router.delete('/deleteCategory/:id', Auth, deleteCategory)
router.post('/setDefault/:id', Auth, setDefault)

export default router