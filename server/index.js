import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users-routes.js'

//Configuration routes imports
import carrierRoutes from './routes/Configuration/carrier-routes.js'
import fuelPricesRoutes from './routes/Configuration/fuel-prices-routes.js'
import fuelCorrectionRoutes from './routes/Configuration/fuel-correction-routes.js'

const app = express()

dotenv.config()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/users', userRoutes)

// Configuration
app.use('/carriers', carrierRoutes)
app.use('/fuel-prices', fuelPricesRoutes)
app.use('/fuel-corrections', fuelCorrectionRoutes)

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error.message)
    })
