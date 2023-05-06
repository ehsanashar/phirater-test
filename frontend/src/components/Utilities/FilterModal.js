import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FilterModal = ({
    showModal,
    setShowModal,
    setFilter,
    criteria,
    setShowCriteria,
}) => {

    const setCriteriaValue = (key, value) => {
        criteria.map(cArray => {
            if (cArray.key === key) {
                cArray.value = value
                cArray.faceValue = value
            }
        })
    }

    const setCriteriaValueForSelect = (key, value) => {

        let valueArray = value.split('-')

        criteria.map(cArray => {
            if (cArray.key === key) {
                cArray.value = valueArray[0]
                cArray.faceValue = valueArray[1]
            }
        })
    }

    const clearFilter = () => {
        criteria.map(cArray => {
            cArray.value = ''
            cArray.faceValue = ''
        })

        setShowCriteria(false)
        setShowModal(false)
        setFilter()
    }

    return (
        <Modal show={showModal} onHide={e => setShowModal(false)}>
            <Modal.Header closeButton>
                <h3 className="fw-light">Filter Settings</h3>
            </Modal.Header>
            <Modal.Body>
                <form id="filterForm">
                    {criteria.map(option => {
                        return (
                            <div className="form-group" key={option.key}>
                                <div className="row mb-2">
                                    <div className="col-lg-2 col-md-2 col-sm-2 mt-2">
                                        <label className="fw-light text-capitalize">{option.key}:</label>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10">
                                        {
                                            option.type === 'select' ?
                                                <select className="form-control" onChange={e => setCriteriaValueForSelect(option.key, e.target.value)}>
                                                    <option value="">Select Carrier</option>
                                                    {
                                                        option.values.map(carrier => {
                                                            return <option value={carrier._id + '-' + carrier.name}>{carrier.name}</option>
                                                        })
                                                    }
                                                </select>
                                                :
                                                <input name={option.name} type='text' className="form-control" defaultValue={option.value} onBlur={e => { setCriteriaValue(option.key, e.target.value) }} />

                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="fw-light" variant="secondary" onClick={e => { setShowModal(false); }}>
                    Close
                </Button>
                <Button className="fw-light" variant="secondary" onClick={e => { clearFilter() }}>
                    Clear Filter
                </Button>
                <Button className="fw-light" variant="primary" onClick={e => { setShowModal(false); setFilter() }}>
                    Set Filter
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterModal