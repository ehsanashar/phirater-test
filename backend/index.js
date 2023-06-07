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
import transportModeRoutes from './routes/Configuration/MasterData/transport-mode-routes.js'
import locationRoutes from './routes/Configuration/MasterData/location-routes.js'
import categoryRoutes from './routes/Configuration/MasterData/category-routes.js'

const app = express()

dotenv.config()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/users', userRoutes)

// Configuration
app.use('/config/carriers', carrierRoutes)
app.use('/config/fuel-prices', fuelPricesRoutes)
app.use('/config/fuel-corrections', fuelCorrectionRoutes)
app.use('/config/master-data/transport-modes', transportModeRoutes)
app.use('/config/master-data/locations', locationRoutes)
app.use('/config/master-data/categories', categoryRoutes)

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error.message)
    })
