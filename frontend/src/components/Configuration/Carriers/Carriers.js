import React, { useEffect, useState } from "react"
import useStyles from '../../styles'
import { useDispatch } from "react-redux"
import { faTruck, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { findByCriteria, createCarrier, updateCarrier, deleteCarrier } from "../../../actions/Configuration/carriers-actions"
import { useSelector } from 'react-redux'
import SweetPagination from "sweetpagination"
import FilterModal from "../../Utilities/FilterModal"
import ShowCriteriaWidget from "../../Utilities/ShowCriteriaWidget"
import Actions from "../../Utilities/Actions"
import RowActions from "../../Utilities/RowActions"
import SubmitActions from "../../Utilities/SubmitActions"
import Messages from "../../Utilities/Messages"

const Carriers = () => {
    const classes = useStyles()

    const carriers = useSelector(state => state.carriersReducer)
    const messagesObj = useSelector(state => state.messagesReducer)

    const dispatch = useDispatch()
    const [detail, setDetail] = useState(null)
    const [currentPageData, setCurrentPageData] = useState(carriers.slice(0, 10))
    const [carrier, setCarrier] = useState({
        name: '',
        country: '',
        currency: '',
        address: '',
        postal_code: '',
        city: '',
        vat: '',
        city: ''
    })

    //modal methods
    const [showModal, setShowModal] = useState(false)
    const [criteria, setCriteria] = useState([
        { 'key': 'name', 'value': '' }
    ])
    const [showCriteria, setShowCriteria] = useState(false)

    const setFilter = () => {
        showCriteriaHandle()
        dispatch(findByCriteria(criteria))
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

    useEffect(() => {
        dispatch(findByCriteria())
    }, [dispatch])

    const reload = () => {
        setCriteria([
            { 'key': 'name', 'value': '' }
        ])
        setShowCriteria(false)
        dispatch(findByCriteria())
    }

    const submitHandle = () => {
        if (carrier._id) {
            dispatch(updateCarrier(carrier._id, carrier))
        } else {
            dispatch(createCarrier(carrier))
        }

        clear()
    }

    const deleteHandle = (id) => {
        dispatch(deleteCarrier(id))
    }

    const setEdit = (carrier) => {
        setDetail({
            'action': 'edit',
        });
        setCarrier(carrier)
    }

    const clear = () => {
        if (messagesObj.type === 'success') {
            closeDetail()
        }
    }

    const closeDetail = () => {
        setCarrier({
            name: '',
            country: '',
            currency: '',
            address: '',
            postal_code: '',
            city: '',
            vat: '',
            city: ''
        })

        setDetail(null)
        clearMessages()
    }

    const clearMessages = () => {
        dispatch({ type: 'MESSAGES', payload: {} })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={!detail ? "col-lg-12 col-md-12 col-sm-12" : "col-lg-8 col-md-8 col-sm-8"} style={{ "paddingRight": 0, "paddingLeft": 0 }}>
                    <section className="section">
                        <header className={classes.header}>
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-5">
                                    <FontAwesomeIcon icon={faTruck} className={classes.ficon} />
                                    <h3>Carriers ({carriers.length ? carriers.length : 0})</h3>
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
                            {carriers.length > 0 ?
                                <div className="table">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr className={classes.tableHeaer}>
                                                <th scope="col">Name</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">City</th>
                                                <th scope="col">Postal Code</th>
                                                <th scope="col">VAT</th>
                                                <th scope="col">Phone</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentPageData.map(item => {
                                                    return <tr className={classes.tableTd} key={item._id}>
                                                        <td>{item.name}</td>
                                                        <td>{item.country}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.postal_code}</td>
                                                        <td>{item.vat}</td>
                                                        <td>{item.phone}</td>
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
                                            getData={carriers}
                                            navigation={true}
                                            style={'style-2'}
                                        />
                                    </div>


                                </div>
                                :
                                <div className="fw-light">No Carriers Found</div>
                            }

                        </div>
                    </section>
                </div>
                <div style={detail ? { "display": "block", "paddingLeft": 0 } : { "display": "none" }} className={detail ? "col-lg-4 col-md-4 col-sm-4" : ""}>
                    <section className="section">
                        <header className={classes.header2}>
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-7">
                                    <h3>{detail?.action === 'add' ? 'Create carrier' : 'Update carrier'}</h3>
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
                                        <label className={classes.label}>Country:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.country} onChange={e => setCarrier({ ...carrier, country: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Name:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.name} onChange={e => setCarrier({ ...carrier, name: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Currency:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.currency} onChange={e => setCarrier({ ...carrier, currency: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Address:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.address} onChange={e => setCarrier({ ...carrier, address: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Postal Code:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.postal_code} onChange={e => setCarrier({ ...carrier, postal_code: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>City:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.city} onChange={e => setCarrier({ ...carrier, city: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>VAT:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.vat} onChange={e => setCarrier({ ...carrier, vat: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className={classes.label}>Phone:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={carrier.phone} onChange={e => setCarrier({ ...carrier, phone: e.target.value })} />
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

export default Carriers