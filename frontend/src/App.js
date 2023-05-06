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

const App = () => {

    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <Container className={classes.noPadding}>
            {user? <Navbar /> : ''}
            
            <Routes>
                {/* Dashboard Routes */}
                <Route path="/" exact element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                <Route path="/dashboard" exact element={<ProtectedRoutes><Home /></ProtectedRoutes>} />

                {/* Configuration Routes */}
                <Route path="/carriers" exact element={<ProtectedRoutes><Carriers /></ProtectedRoutes>} />
                <Route path="/fuel-prices" exact element={<ProtectedRoutes><FuelPrices /></ProtectedRoutes>} />
                <Route path="/fuel-corrections" exact element={<ProtectedRoutes><FuelCorrections /></ProtectedRoutes>} />

                {/* Auth Routes */}
                <Route path="/auth" exact element={<Auth />} />
            </Routes>
        </Container>
    )
}

export default App