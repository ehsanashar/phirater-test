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
import RowActions from "../../Utilities/RowActions"
import {
    findLocationsByCriteria,
    createLocation,
    updateLocation,
    deleteLocation,
    setDefault
} from "../../../actions/Configuration/MasterData/location-actions"
import SubmitActions from "../../Utilities/SubmitActions"
import Messages from "../../Utilities/Messages"

const Locations = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const locations = useSelector((state) => state.locationsReducer)
    const messagesObj = useSelector(state => state.messagesReducer)

    useEffect(() => {
        dispatch(findLocationsByCriteria())
    }, [dispatch])

    const [currentPageData, setCurrentPageData] = useState(locations?.slice(0, 10))
    const [location, setLocation] = useState({
        name: '',
    })

    const [detail, setDetail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [criteria, setCriteria] = useState([
        { 'key': 'name', 'value': '' }
    ])
    const [showCriteria, setShowCriteria] = useState(false)

    const setFilter = () => {
        showCriteriaHandle()
        dispatch(findLocationsByCriteria(criteria))
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
        dispatch(findLocationsByCriteria())
    }

    const submitHandle = () => {
        if (location._id) {
            dispatch(updateLocation(location._id, location))
        } else {
            dispatch(createLocation(location))
        }

        clear()
    }

    const deleteHandle = (id) => {
        dispatch(deleteLocation(id))
    }

    const setDefaultLocation = (id) => {
        dispatch(setDefault(id))
    }

    const setEdit = (location) => {
        setDetail({
            'action': 'edit',
        });
        setLocation(location)
    }

    const clear = () => {
        if (messagesObj.type === 'success') {
            closeDetail()
        }
    }

    const closeDetail = () => {
        setLocation({
            name: '',
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
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <h3>Master Data Management </h3>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5">
                                    <FontAwesomeIcon icon={faCogs} className={classes.ficon} />
                                    <h3>Locations ({locations ? locations.length : 0}) </h3>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4" style={{ "textAlign": "right" }}>
                                    <Actions reload={reload} setShowModal={setShowModal} setDetail={setDetail} />
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

                                {messagesObj.type === 'success' ?
                                    <Messages messagesObj={messagesObj} clearMessages={clearMessages} /> : <></>
                                }

                                {locations?.length > 0 ?
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
                                                                        <FontAwesomeIcon icon={faCheck} onClick={e => setDefaultLocation(item._id)} />
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
                                                getData={locations}
                                                navigation={true}
                                                style={'style-2'}
                                            />
                                        </div>


                                    </div>
                                    :
                                    <div className="fw-light">No Location Found</div>
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
                                    <h3>{detail?.action === 'add' ? 'Create Location' : 'Update Location'}</h3>
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
                                        <label className={classes.label}>Name:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        <input type='text' className="form-control" value={location.name} onChange={e => setLocation({ ...location, name: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <SubmitActions clear={closeDetail} submitHandle={submitHandle} detail={detail} />
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

export default Locations