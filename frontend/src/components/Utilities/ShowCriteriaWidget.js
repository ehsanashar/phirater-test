import React from "react"
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStyles from '../styles'

const ShowCriteriaWidget = ({ criteria, setShowModal }) => {

    const classes = useStyles()

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return (
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                {criteria.map(cr => {
                    return cr.faceValue !== undefined ? <button className="btn btn-primary mt-2 mb-2 fw-light" style={{ marginRight: '2px' }} onClick={e => setShowModal(true)}>
                        <FontAwesomeIcon icon={faFilter} className={classes.mr2} />
                        {capitalizeFirstLetter(cr.key) + ': ' + cr.faceValue}
                    </button> : ''
                })}

            </div>

        </div>
    )
}

export default ShowCriteriaWidget

