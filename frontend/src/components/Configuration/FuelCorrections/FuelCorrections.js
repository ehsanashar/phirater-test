import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { faPlus, faFilter, faRefresh, faList, faPencil, faTrash, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    createFuelCorrection,
    deleteFuelCorrection,
    findFuelCorrectionsByCriteria,
    updateFuelCorrection
} from "../../../actions/Configuration/fuel-corrections-actions"
import { findByCriteria as findCarriersByCriteria } from "../../../actions/Configuration/carriers-actions"
import { useSelector } from 'react-redux'
import SweetPagination from "sweetpagination"
import FilterModal from "../../Utilities/FilterModal"
import ShowCriteriaWidget from "../../Utilities/ShowCriteriaWidget"
import Actions from "../../Utilities/Actions"

const FuelCorrections = () => {
    const classes = useStyles()
    const fuelCorrections = useSelector((state) => state.fuelCorrectionsReducer)
    const carriers = useSelector((state) => state.carriersReducer)
    const dispatch = useDispatch()
    const [detail, setDetail] = useState(null)
    const [currentPageData, setCurrentPageData] = useState(fuelCorrections?.slice(0, 10))
    const [fuelCorrection, setFuelCorrection] = useState({
        carrier: '',
        from: '',
        to: '',
        correction: '',
    })

    //modal methods
    const [showModal, setShowModal] = useState(false)
    const [criteria, setCriteria] = useState([
        { 'key': 'carrier', 'value': '', 'type': 'select', 'values': carriers },
    ])
    const [showCriteria, setShowCriteria] = useState(false)

    useEffect(() => {
        dispatch(findFuelCorrectionsByCriteria())
        dispatch(findCarriersByCriteria())
    }, [dispatch])

    const setFilter = () => {
        showCriteriaHandle()
        dispatch(findFuelCorrectionsByCriteria(criteria))
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
            { 'key': 'carrier', 'value': '', 'type': 'select', 'values': carriers },
        ])
        setShowCriteria(false)
        dispatch(findFuelCorrectionsByCriteria())
        dispatch(findCarriersByCriteria())
    }

    const submitHandle = () => {
        if (fuelCorrection._id) {
            dispatch(updateFuelCorrection(fuelCorrection._id, fuelCorrection))
        } else {
            dispatch(createFuelCorrection(fuelCorrection))
        }

        clear()
    }

    const deleteHandle = (id) => {
        dispatch(deleteFuelCorrection(id))
    }

    const setEdit = (fuelCorrection) => {
        setDetail({
            'action': 'edit',
        });
        setFuelCorrection(fuelCorrection)
    }

    const clear = () => {
        setFuelCorrection({
            carrier: '',
            from: '',
            to: '',
            correction: '',
        })
        setDetail(null)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={!detail ? "col-lg-12 col-md-12 col-sm-12" : "col-lg-8 col-md-8 col-sm-8"} style={{ 'paddingRight': 0 }}>
                    <section className="section">
                        <header className={classes.header}>
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-5">
                                    <FontAwesomeIcon icon={faMoneyBill} className={classes.ficon} />
                                    <h3>Fuel Corrections ({fuelCorrections ? fuelCorrections.length : 0})</h3>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-7" style={{ "textAlign": "right" }}>
                                    <Actions reload={reload} setShowModal={setShowModal} setDetail={setDetail} />
                                </div>
                            </div>
                        </header>

                        {showCriteria ?
                            <ShowCriteriaWidget criteria={criteria} setShowModal={setShowModal} /> : <></>
                        }


                        <div className="row">
                            {fuelCorrections?.length > 0 ?
                                <div className="table">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr className={classes.tableHeaer}>
                                                <th scope="col">Carrier</th>
                                                <th scope="col">From</th>
                                                <th scope="col">To</th>
                                                <th scope="col">Percentage</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentPageData.map(item => {
                                                    return <tr className={classes.tableTd} key={item._id}>
                                                        <td>{item.carrier}</td>
                                                        <td>{item.from} </td>
                                                        <td>{item.to} </td>
                                                        <td>{item.correction}%</td>
                                                        <td style={{ "textAlign": "right" }}>
                                                            <button className="btn btn-primary">
                                                                <FontAwesomeIcon icon={faPencil} onClick={e => setEdit(item)} />
                                                            </button>
                                                            <button className="btn btn-warning">
                                                                <FontAwesomeIcon icon={faTrash} onClick={e => deleteHandle(item._id)} />
                                                            </button>
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
                                            getData={fuelCorrections}
                                            navigation={true}
                                            style={'style-2'}
                                        />
                                    </div>


                                </div>
                                :
                                <div className="fw-light">No Fuel Corrections Found</div>
                            }

                        </div>
                    </section>
                </div>
                <div style={detail ? { "display": "block", "paddingLeft": 0 } : { "display": "none" }} className={detail ? "col-lg-4 col-md-4 col-sm-4" : ""}>
                    <section className="section">
                        <header className={classes.header2}>
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-7">
                                    <h3 className={classes.addUpdateHeader}>{detail?.action === 'add' ? 'Create Fuel Correction' : 'Update Correction'}</h3>
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
                                        <label className={classes.label}>Carrier:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <select className="form-control" onChange={e => setFuelCorrection({ ...fuelCorrection, carrier: e.target.value })}>
                                            <option value="">Select Carrier</option>
                                            {
                                                carriers.map(carrier => {
                                                    return <option value={carrier._id}>{carrier.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>From:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={fuelCorrection.from} onChange={e => setFuelCorrection({ ...fuelCorrection, from: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>To</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={fuelCorrection.to} onChange={e => setFuelCorrection({ ...fuelCorrection, to: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Correction</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='number' className="form-control" value={fuelCorrection.correction} onChange={e => setFuelCorrection({ ...fuelCorrection, correction: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mt-2">
                                    <div className="col-lg-3 col-md-3 col-sm-3 offset-6">
                                        <button type="button" className="btn btn-default" onClick={e => clear()}>Cancel</button>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3">
                                        <button type="button" className="btn btn-warning" onClick={e => submitHandle()}>{detail?.action === 'add' ? 'Create' : 'Update'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div >

            <div className="modal">
                <FilterModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setFilter={setFilter}
                    criteria={criteria}
                    setShowCriteria={setShowCriteria}
                />
            </div>
        </div >
    )
}

export default FuelCorrections