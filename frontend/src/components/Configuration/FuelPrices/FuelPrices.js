import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { faFile, faList, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    createFuelPrice,
    deleteFuelPrice,
    findFuelPricesByCriteria,
    updateFuelPrice
} from "../../../actions/Configuration/fuel-prices-actions"
import { findByCriteria as findCarriersByCriteria } from "../../../actions/Configuration/carriers-actions"
import { useSelector } from 'react-redux'
import SweetPagination from "sweetpagination"
import FilterModal from "../../Utilities/FilterModal"
import FormatDate from "../../Utilities/FormatDate"
import ShowCriteriaWidget from "../../Utilities/ShowCriteriaWidget"
import Actions from "../../Utilities/Actions"
import RowActions from "../../Utilities/RowActions"
import SubmitActions from "../../Utilities/SubmitActions"
import Messages from "../../Utilities/Messages"

const FuelPrices = () => {
    const classes = useStyles()
    const fuelPrices = useSelector((state) => state.fuelPricesReducer)
    const carriers = useSelector((state) => state.carriersReducer)
    const messagesObj = useSelector(state => state.messagesReducer)

    const dispatch = useDispatch()
    const [detail, setDetail] = useState(null)
    const [currentPageData, setCurrentPageData] = useState(fuelPrices.slice(0, 10))
    const [fuelPrice, setFuelPrice] = useState({
        carrier: '',
        price: '',
        valid_from: '',
        valid_until: '',
    })

    //modal methods
    const [showModal, setShowModal] = useState(false)
    const [criteria, setCriteria] = useState([
        { 'key': 'price', 'value': '' },
        { 'key': 'carrier', 'value': '', 'type': 'select', 'values': carriers },
    ])
    const [showCriteria, setShowCriteria] = useState(false)

    useEffect(() => {
        dispatch(findFuelPricesByCriteria())
        dispatch(findCarriersByCriteria())
    }, [dispatch])

    const setFilter = () => {
        showCriteriaHandle()
        dispatch(findFuelPricesByCriteria(criteria))
    }

    const showCriteriaHandle = () => {
        let flag = false
        criteria.map(cr => {
            if (cr.value !== '') {
                flag = true
            }
        })

        setShowCriteria(flag)
    }

    const reload = () => {
        setCriteria([
            { 'key': 'price', 'value': '' },
            { 'key': 'carrier', 'value': '', 'type': 'select', 'values': carriers },
        ])
        setShowCriteria(false)
        dispatch(findFuelPricesByCriteria())
        dispatch(findCarriersByCriteria())
    }

    const submitHandle = () => {
        if (fuelPrice._id) {
            dispatch(updateFuelPrice(fuelPrice._id, fuelPrice))
        } else {
            dispatch(createFuelPrice(fuelPrice))
        }

        clear()
    }

    const deleteHandle = (id) => {
        dispatch(deleteFuelPrice(id))
    }

    const setEdit = (fuelPrice) => {
        setDetail({
            'action': 'edit',
        });
        setFuelPrice(fuelPrice)
    }

    const clear = () => {
        if (messagesObj.type === 'success') {
            closeDetail()
        }
    }

    const closeDetail = () => {
        setFuelPrice({
            carrier: '',
            price: '',
            valid_from: '',
            valid_until: '',
        })
        setDetail(null)

        setDetail(null)
        clearMessages()
    }

    const clearMessages = () => {
        dispatch({ type: 'MESSAGES', payload: {} })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={!detail ? "col-lg-12 col-md-12 col-sm-12" : "col-lg-8 col-md-8 col-sm-8"} style={{ 'paddingRight': 0, "paddingLeft": 0 }}>
                    <section className="section">
                        <header className={classes.header}>
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-5">
                                    <FontAwesomeIcon icon={faMoneyBill} className={classes.ficon} />
                                    <h3>Fuel Prices ({fuelPrices.length ? fuelPrices.length : 0})</h3>
                                </div>
                                <div className="col-lg-7 col-md-7 col-sm-7" style={{ "textAlign": "right" }}>
                                    <Actions reload={reload} setShowModal={setShowModal} setDetail={setDetail} />
                                </div>
                            </div>
                        </header>

                        {showCriteria ?
                            <ShowCriteriaWidget criteria={criteria} setShowModal={setShowModal} /> : <></>
                        }

                        {messagesObj.type === 'success' ?
                            <Messages messagesObj={messagesObj} clearMessages={clearMessages} /> : <></>
                        }

                        <div className="row">
                            {fuelPrices?.length > 0 ?
                                <div className="table">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr className={classes.tableHeaer}>
                                                <th scope="col">Price</th>
                                                <th scope="col">Valid From</th>
                                                <th scope="col">Valid Until</th>
                                                <th scope="col">Carrier</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentPageData.map(item => {
                                                    return <tr className={classes.tableTd} key={item._id}>
                                                        <td>{item.price}</td>
                                                        <td><FormatDate date={item.valid_from} /></td>
                                                        <td><FormatDate date={item.valid_until} /></td>
                                                        <td>{item.carrier}</td>
                                                        <td style={{ "textAlign": "right" }}>
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
                                            getData={fuelPrices}
                                            navigation={true}
                                            style={'style-2'}
                                        />
                                    </div>


                                </div>
                                :
                                <div className="fw-light">No Fuel Prices Found</div>
                            }

                        </div>
                    </section>
                </div>
                <div style={detail ? { "display": "block", "paddingLeft": 0 } : { "display": "none" }} className={detail ? "col-lg-4 col-md-4 col-sm-4" : ""}>
                    <section className="section">
                        <header className={classes.header2}>
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-7">
                                    <h3>{detail?.action === 'add' ? 'Create Fuel Price' : 'Update Fuel Price'}</h3>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5" style={{ "textAlign": "right" }}>
                                    <button className="btn btn-small btn-warning text-light" >
                                        <FontAwesomeIcon icon={faList} onClick={e => closeDetail()} />
                                    </button>
                                </div>
                            </div>
                        </header>

                        {messagesObj.type === 'danger' ?
                            <Messages messagesObj={messagesObj} clearMessages={clearMessages} /> : <></>
                        }

                        <div className="row mt-2 p-1">
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Carrier:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <select className="form-control" onChange={e => setFuelPrice({ ...fuelPrice, carrier: e.target.value })}>
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
                                        <label className={classes.label}>Price:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='number' className="form-control" value={fuelPrice.price} onChange={e => setFuelPrice({ ...fuelPrice, price: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Valid From:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='date' className="form-control" value={fuelPrice.valid_from} onChange={e => setFuelPrice({ ...fuelPrice, valid_from: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Valid Until:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='date' className="form-control" value={fuelPrice.valid_until} onChange={e => setFuelPrice({ ...fuelPrice, valid_until: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <SubmitActions clear={closeDetail} submitHandle={submitHandle} detail={detail} />
                        </div>

                    </section>
                </div>
            </div >

            <div className="modal">
                <FilterModal showModal={showModal} setShowModal={setShowModal} setFilter={setFilter} criteria={criteria} setShowCriteria={setShowCriteria} />
            </div>
        </div >
    )
}

export default FuelPrices