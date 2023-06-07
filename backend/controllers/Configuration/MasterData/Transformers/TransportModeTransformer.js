
const TransportModeTransformer = class {

    /**
     * 
     * @param {*} transportMode 
     * @returns 
     */
    static transform = (transportMode) => {
        return {
            '_id': transportMode._id,
            'name': transportMode.name,
            'is_default': transportMode.is_default,
            'created_at': new Date(transportMode.created_at),
            'updated_at': new Date(transportMode.updated_at)
        };
    }

    /**
     * 
     * @param {*} transportModes 
     * @returns array
     */
    static transformCollection = (transportModes) => {
        let transformed = []

        transportModes.forEach(transportMode => {
            transformed.push(this.transform(transportMode))
        });

        return transformed
    }
}

export default TransportModeTransformer