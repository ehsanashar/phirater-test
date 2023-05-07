import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { faTruck, faPlus, faFilter, faRefresh, faList, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import MasterDataNav from "./MasterDataNav"

const MasterData = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {

    }, [dispatch])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12" style={{ "paddingRight": 0, "paddingLeft": 0 }}>
                    <section className="section">
                        <header className={classes.header}>
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-5">
                                    <h3>Master Data Management </h3>
                                </div>
                            </div>
                        </header>
                    </section>
                    <div>
                        <section className={classes.mdright}>
                            <MasterDataNav />
                        </section>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default MasterData