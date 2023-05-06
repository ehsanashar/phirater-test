import React from "react"
import { render } from "react-dom"

const FormatDate = ({ date, dateOnly = true }) => {

    const formatDateOnly = () => {
        let d = new Date(date)

        let month = d.getMonth() + 1
        if(month.toString().length < 2) month = '0' + month
        let day = d.getDate()
        if(day.toString().length < 2) day = '0' + day
        let year = d.getFullYear()

        return [day, month, year].join('-')
    }

    return (
        <p>{formatDateOnly()}</p>
    )
}

export default FormatDate

