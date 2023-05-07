import React from "react"
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SubmitActions = ({ clear, submitHandle, detail }) => {

    return (
        <>
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
        </>
    )
}

export default SubmitActions

