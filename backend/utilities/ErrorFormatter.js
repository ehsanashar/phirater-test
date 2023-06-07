
export const FormatErrors = (errors) => {
    let formattedErrors = []

    for (let error in errors) {
        if (errors[error].kind === 'ObjectId') {
            formattedErrors.push('Invalid ' + errors[error].path)
        } else {
            formattedErrors.push(errors[error].properties.message)
        }
    }

    return formattedErrors
}