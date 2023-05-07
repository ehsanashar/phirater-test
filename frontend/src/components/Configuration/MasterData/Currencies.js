import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { faCogs, faPencil, faTrash, faList, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import MasterDataNav from "./MasterDataNav"
import Actions from "../../Utilities/Actions"
import ShowCriteriaWidget from "../../Utilities/ShowCriteriaWidget"
import SweetPagination from "sweetpagination"
import FilterModal from "../../Utilities/FilterModal"
import RowActions from "../../Utilities/RowActions"

const Currencies = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
    }, [dispatch])

    // const [currentPageData, setCurrentPageData] = useState(transportModes?.slice(0, 10))

    const [detail, setDetail] = useState(null)
    // const [showModal, setShowModal] = useState(false)
    // const showActions = { 'reload': true, 'filter': false, 'add': true }
    // const [criteria, setCriteria] = useState([
    //     { 'key': 'name', 'value': '' }
    // ])
    // const [showCriteria, setShowCriteria] = useState(false)

    // const setFilter = () => {
    //     showCriteriaHandle()
    //     dispatch(findTransportModesByCriteria(criteria))
    // }

    // const showCriteriaHandle = () => {
    //     let flag = true
    //     criteria.map(cr => {
    //         if (cr.value === '') {
    //             flag = false
    //         }
    //     })

    //     setShowCriteria(flag)
    // }

    // const reload = () => {
    //     setCriteria([
    //         { 'key': 'name', 'value': '' }
    //     ])
    //     setShowCriteria(false)
    //     dispatch(findTransportModesByCriteria())
    // }

    // const submitHandle = () => {
    //     if (transportMode._id) {
    //         dispatch(updateTransportMode(transportMode._id, transportMode))
    //     } else {
    //         dispatch(createTransportMode(transportMode))
    //     }

    //     clear()
    // }

    // const deleteHandle = (id) => {
    //     dispatch(deleteTransportMode(id))
    // }

    // const setDefaultTransportModeMode = (id) => {
    //     dispatch(setDefault(id))
    // }

    // const setEdit = (transportMode) => {
    //     setDetail({
    //         'action': 'edit',
    //     });
    //     setTransportMode(transportMode)
    // }

    // const clear = () => {
    //     setTransportMode({
    //         name: '',
    //     })
    //     setDetail(null)
    // }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={!detail ? "col-lg-12 col-md-12 col-sm-12" : "col-lg-8 col-md-8 col-sm-8"} style={{ "paddingRight": 0, "paddingLeft": 0 }}>
                    <section className="section">
                        <header className={classes.header}>
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <h3>Master Data Management </h3>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5">
                                    <FontAwesomeIcon icon={faCogs} className={classes.ficon} />
                                    <h3>Currencies (0) </h3>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4" style={{ "textAlign": "right" }}>
                                    {/* <Actions reload={reload} setShowModal={setShowModal} setDetail={setDetail} showActions={showActions} /> */}
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
            </div>
        </div>
    )
}

export default Currencies