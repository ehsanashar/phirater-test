import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom'

const MasterDataNav = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const subMenuClasses = classes.subMenuFont + ' ' + classes.subMenu + ' ' + classes.mdnave

    useEffect(() => {

    }, [dispatch])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12" style={{ "paddingRight": 0, "paddingLeft": 0 }}>

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/transport-modes'>Transport Modes</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/locations'>Locations</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/categories'>Categories</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/countries'>Countries</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/currencies'>Currencies</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/units'>Units</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/statuses'>Statuses</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/screen-options'>Screen Options</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/incoterms'>Incoterms</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/airlines'>Airlines</NavLink>

                    <hr className={classes.hr} />

                    <NavLink className={subMenuClasses} activeClassName={classes.activeClass} to='/config/master-data/packages'>Packages</NavLink>

                </div>
            </div >
        </div >
    )
}

export default MasterDataNav