import mongoose from "mongoose"
import Category from "../../../models/Configuration/MasterData/Category.js"
import CategoryTransformer from "./Transformers/CategoryTransformer.js"
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

        const categories = await Category.find(query)

        res.status(200).json(
            {
                'status': 200,
                'messages': [],
                'data': CategoryTransformer.transformCollection(categories),
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

export const createCategory = async (req, res) => {
    const category = req.body
    const newCategory = new Category(category)

    try {
        await newCategory.save()

        res.status(201).json(
            {
                'status': 201,
                'messages': ['Category added.'],
                'data': CategoryTransformer.transform(newCategory),
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

export const updateCategory = async (req, res) => {
    const { id: _id } = req.params
    const category = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Category not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        const updatedCategory = await Category.findByIdAndUpdate(_id, category, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Category updated.'],
                'data': CategoryTransformer.transform(updatedCategory),
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

export const deleteCategory = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).json({
                'status': 404,
                'messages': ['Category not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await Category.findByIdAndDelete(_id);

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Category deleted.'],
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
                'messages': ['Category not found.'],
                'data': [],
                'type': 'danger'
            })
        }

        await Category.findOneAndUpdate(
            { 'is_default': true },
            { 'is_default': false }
        )

        await Category.findByIdAndUpdate(_id, { is_default: true }, { new: true })

        res.status(200).json(
            {
                'status': 200,
                'messages': ['Default Category updated.'],
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


