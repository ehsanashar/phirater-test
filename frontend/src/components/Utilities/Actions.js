import React from "react"
import { faRefresh, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Actions = ({
    reload,
    setShowModal,
    setDetail,
    showActions = { 'reload': true, 'filter': true, 'add': true } }) => {

    return (
        <>
            {
                showActions.reload ? <button className="btn btn-small btn-warning text-light mx-1" onClick={e => reload()}>
                    <FontAwesomeIcon icon={faRefresh} />
                </button> : ''
            }

            {
                showActions.filter ? <button className="btn btn-small btn-warning text-light mx-1" type="button" onClick={e => setShowModal(true)}>
                    <FontAwesomeIcon icon={faFilter} />
                </button> : ''
            }

            {
                showActions.add ? <button type="button" className="btn btn-small btn-warning text-light mx-1" onClick={e => setDetail({ 'action': 'add' })}>
                    <FontAwesomeIcon icon={faPlus} />
                </button> : ''
            }
        </>
    )
}

export default Actions

