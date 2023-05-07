import React from "react"
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import useStyles from './styles'

import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"

import ProtectedRoutes from "./components/Auth/ProtectedRoutes"

import Auth from "./components/Auth/Auth"

//Configuration
import Carriers from "./components/Configuration/Carriers/Carriers"
import FuelPrices from "./components/Configuration/FuelPrices/FuelPrices"
import FuelCorrections from "./components/Configuration/FuelCorrections/FuelCorrections"
import MasterData from "./components/Configuration/MasterData/MasterData"
import TransportModes from "./components/Configuration/MasterData/TransportModes"
import Locations from "./components/Configuration/MasterData/Locations"
import Categories from "./components/Configuration/MasterData/Categories"
import Countries from "./components/Configuration/MasterData/Countries"
import Currencies from "./components/Configuration/MasterData/Currencies"
import Units from "./components/Configuration/MasterData/Units"
import Statuses from "./components/Configuration/MasterData/Statuses"
import ScreenOptions from "./components/Configuration/MasterData/ScreenOptions"
import Incoterms from "./components/Configuration/MasterData/Incoterms"
import Airlines from "./components/Configuration/MasterData/Airlines"
import Packages from "./components/Configuration/MasterData/Packages"

const App = () => {

    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <Container className={classes.noPadding}>
            {user ? <Navbar /> : ''}

            <Routes>
                {/* Dashboard Routes */}
                <Route path="/" exact element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                <Route path="/dashboard" exact element={<ProtectedRoutes><Home /></ProtectedRoutes>} />

                {/* Configuration Routes */}
                <Route path="/config/carriers" exact element={<ProtectedRoutes><Carriers /></ProtectedRoutes>} />
                <Route path="/config/fuel-prices" exact element={<ProtectedRoutes><FuelPrices /></ProtectedRoutes>} />
                <Route path="/config/fuel-corrections" exact element={<ProtectedRoutes><FuelCorrections /></ProtectedRoutes>} />
                <Route path="/config/master-data" exact element={<ProtectedRoutes><MasterData /></ProtectedRoutes>} />
                <Route path="/config/master-data/transport-modes" exact element={<ProtectedRoutes><TransportModes /></ProtectedRoutes>} />
                <Route path="/config/master-data/locations" exact element={<ProtectedRoutes><Locations /></ProtectedRoutes>} />
                <Route path="/config/master-data/categories" exact element={<ProtectedRoutes><Categories /></ProtectedRoutes>} />
                <Route path="/config/master-data/countries" exact element={<ProtectedRoutes><Countries /></ProtectedRoutes>} />
                <Route path="/config/master-data/currencies" exact element={<ProtectedRoutes><Currencies /></ProtectedRoutes>} />
                <Route path="/config/master-data/units" exact element={<ProtectedRoutes><Units /></ProtectedRoutes>} />
                <Route path="/config/master-data/statuses" exact element={<ProtectedRoutes><Statuses /></ProtectedRoutes>} />
                <Route path="/config/master-data/screen-options" exact element={<ProtectedRoutes><ScreenOptions /></ProtectedRoutes>} />
                <Route path="/config/master-data/incoterms" exact element={<ProtectedRoutes><Incoterms /></ProtectedRoutes>} />
                <Route path="/config/master-data/airlines" exact element={<ProtectedRoutes><Airlines /></ProtectedRoutes>} />
                <Route path="/config/master-data/packages" exact element={<ProtectedRoutes><Packages /></ProtectedRoutes>} />

                {/* Auth Routes */}
                <Route path="/auth" exact element={<Auth />} />
            </Routes>
        </Container>
    )
}

export default App