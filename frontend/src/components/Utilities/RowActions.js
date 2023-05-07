import React from "react"
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RowActions = ({ setEdit, deleteHandle, item, classes }) => {

    return (
        <>
            <button className={`btn btn-primary ${classes.rowIcons}`}>
                <FontAwesomeIcon icon={faPencil} onClick={e => setEdit(item)} />
            </button>
            <button className={`btn btn-danger ${classes.rowIcons}`}>
                <FontAwesomeIcon icon={faTrash} onClick={e => deleteHandle(item._id)} />
            </button>
        </>
    )
}

export default RowActions

