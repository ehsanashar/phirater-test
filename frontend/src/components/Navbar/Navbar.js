import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const dropdownClasses = classes.menuFont + ' ' + classes.dropdownPR
    const subMenuClasses = classes.subMenuFont + ' ' + classes.subMenu

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        navigate('/auth')

        setUser(null)
    }

    return (
        <div>
            {user ? (
                <AppBar position="static" color="inherit" className={classes.appBar + ' ' + classes.marginTopZero}>
                    <div className={classes.brandContainer}>
                        <Typography component={Link} to="/" variant="h6" align="center" className={classes.heading}>
                            PHIRATER
                        </Typography>
                    </div>
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.menuFont} component={Link} to='/'>Dashboard</Typography>
                        <div className={dropdownClasses}>
                            <Typography className={classes.dropbtn}>Price Calculation</Typography>
                            <div className={classes.dropdownContent}>
                                <Typography className={subMenuClasses} component={Link} to='/'>Search</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Template Search</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Pending Requests</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Multi Shipment</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Transport Orders</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Simulated Orders</Typography>
                            </div>
                        </div>
                        <Typography className={classes.menuFont}>Rates</Typography>
                        <div className={dropdownClasses}>
                            <Typography className={classes.dropbtn}>Configuration</Typography>
                            <div className={classes.dropdownContent}>
                                <Typography className={subMenuClasses} component={Link} to='/'>Additional Costs</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Additional Factors</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/carriers'>Carriers</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Conversions</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/fuel-prices'>Fuel Prices</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/fuel-corrections'>Fuel Corrections</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Curerncy Conversions</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Regions</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Zones</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Taxonomy Manager</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Master Data</Typography>
                            </div>
                        </div>
                        <div className={dropdownClasses}>
                            <Typography className={classes.dropbtn}>Files</Typography>
                            <div className={classes.dropdownContent}>
                                <Typography className={subMenuClasses} component={Link} to='/'>Orders</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Simulations</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Invoices</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Missing Information</Typography>
                                <Typography className={subMenuClasses} component={Link} to='/'>Uploads</Typography>
                            </div>
                        </div>
                        <Typography className={classes.menuFont} component={Link} to='/'>Relations</Typography>
                        <Typography className={classes.menuFont} onClick={logout}>Logout</Typography>
                    </Toolbar>
                </AppBar>
            ) : ''}

        </div>
    )
}

export default Navbar