import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { faCogs, faList, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import MasterDataNav from "./MasterDataNav"
import Actions from "../../Utilities/Actions"
import ShowCriteriaWidget from "../../Utilities/ShowCriteriaWidget"
import SweetPagination from "sweetpagination"
import FilterModal from "../../Utilities/FilterModal"
import {
    findTransportModesByCriteria,
    createTransportMode,
    updateTransportMode,
    deleteTransportMode,
    setDefault
} from "../../../actions/Configuration/MasterData/transport-mode-actions"
import RowActions from "../../Utilities/RowActions"
import SubmitActions from "../../Utilities/SubmitActions"

const TransportModes = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const transportModes = useSelector((state) => state.transportModesReducer)

    useEffect(() => {
        dispatch(findTransportModesByCriteria())
    }, [dispatch])

    const [currentPageData, setCurrentPageData] = useState(transportModes?.slice(0, 10))
    const [transportMode, setTransportMode] = useState({
        name: '',
    })
    const [detail, setDetail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const showActions = { 'reload': true, 'filter': false, 'add': true }
    const [criteria, setCriteria] = useState([
        { 'key': 'name', 'value': '' }
    ])
    const [showCriteria, setShowCriteria] = useState(false)

    const setFilter = () => {
        showCriteriaHandle()
        dispatch(findTransportModesByCriteria(criteria))
    }

    const showCriteriaHandle = () => {
        let flag = true
        criteria.map(cr => {
            if (cr.value === '') {
                flag = false
            }
        })

        setShowCriteria(flag)
    }

    const reload = () => {
        setCriteria([
            { 'key': 'name', 'value': '' }
        ])
        setShowCriteria(false)
        dispatch(findTransportModesByCriteria())
    }

    const submitHandle = () => {
        if (transportMode._id) {
            dispatch(updateTransportMode(transportMode._id, transportMode))
        } else {
            dispatch(createTransportMode(transportMode))
        }

        clear()
    }

    const deleteHandle = (id) => {
        dispatch(deleteTransportMode(id))
    }

    const setDefaultTransportModeMode = (id) => {
        dispatch(setDefault(id))
    }

    const setEdit = (transportMode) => {
        setDetail({
            'action': 'edit',
        });
        setTransportMode(transportMode)
    }

    const clear = () => {
        setTransportMode({
            name: '',
        })
        setDetail(null)
    }

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
                                    <h3>Transport Modes ({transportModes.length}) </h3>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4" style={{ "textAlign": "right" }}>
                                    <Actions reload={reload} setShowModal={setShowModal} setDetail={setDetail} showActions={showActions} />
                                </div>
                            </div>
                        </header>
                    </section>
                    <div>
                        <section className={classes.mdright}>
                            <MasterDataNav />
                        </section>
                        <section>
                            {showCriteria ?
                                <ShowCriteriaWidget criteria={criteria} setShowModal={setShowModal} /> : <></>
                            }

                            <div className="row">
                                {transportModes?.length > 0 ?
                                    <div className="table">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr className={classes.tableHeaer}>
                                                    <th scope="col">Name</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentPageData.map(item => {
                                                        return <tr className={classes.tableTd} key={item._id}>
                                                            <td>{item.name}</td>
                                                            <td>{item.is_default === true ? <FontAwesomeIcon icon={faCheck} /> : <></>}</td>
                                                            <td style={{ "textAlign": "right" }}>
                                                                {
                                                                    item.is_default === false ? <button className={`btn btn-primary ${classes.rowIcons}`}>
                                                                        <FontAwesomeIcon icon={faCheck} onClick={e => setDefaultTransportModeMode(item._id)} />
                                                                    </button> : <></>
                                                                }

                                                                <RowActions
                                                                    setEdit={setEdit}
                                                                    deleteHandle={deleteHandle}
                                                                    item={item}
                                                                    classes={classes}
                                                                />
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                        <div className="row">
                                            <SweetPagination
                                                currentPageData={setCurrentPageData}
                                                dataPerPage={8}
                                                getData={transportModes}
                                                navigation={true}
                                                style={'style-2'}
                                            />
                                        </div>


                                    </div>
                                    :
                                    <div className="fw-light">No Transport Modes Found</div>
                                }

                            </div>
                        </section>
                    </div>
                </div>

                <div style={detail ? { "display": "block", "paddingLeft": 0 } : { "display": "none" }} className={detail ? "col-lg-4 col-md-4 col-sm-4" : ""}>
                    <section className="section">
                        <header className={classes.header2}>
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-7">
                                    <h3>{detail?.action === 'add' ? 'Create Transport Mode' : 'Update Transport Mode'}</h3>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5" style={{ "textAlign": "right" }}>
                                    <button className="btn btn-small btn-warning text-light" >
                                        <FontAwesomeIcon icon={faList} onClick={e => clear()} />
                                    </button>
                                </div>
                            </div>

                        </header>
                        <div className="row mt-2 p-1">
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Name:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={transportMode.name} onChange={e => setTransportMode({ ...transportMode, name: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <SubmitActions clear={clear} submitHandle={submitHandle} detail={detail} />
                        </div>

                    </section>
                </div>

                <div className="modal">
                    <FilterModal showModal={showModal} setShowModal={setShowModal} setFilter={setFilter} criteria={criteria} setShowCriteria={setShowCriteria} />
                </div>
            </div>
        </div>
    )
}

export default TransportModes