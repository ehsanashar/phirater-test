import React from "react"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Messages = ({ messagesObj, clearMessages }) => {

    return (
        <>
            <div className="row" style={{ width: '96%', marginLeft: '2%', marginTop: '1%' }}>
                {
                    messagesObj.messages?.length > 0 ?
                        <div className={'alert alert-' + messagesObj.type} style={{ fontSize: '15px', fontWeight: 300, marginBottom: 0, paddingBottom: 0 }}>
                            <div style={{ float: 'right', cursor: 'pointer' }} onClick={e => clearMessages()}>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                            <ul>
                                {
                                    messagesObj.messages.map((message, index) => {
                                        return <li key={index}>{message}</li>
                                    })
                                }
                            </ul>
                        </div> : <></>
                }

            </div>
        </>
    )
}

export default Messages

