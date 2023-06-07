
const LocationTransformer = class {

    /**
     * 
     * @param {*} location 
     * @returns 
     */
    static transform = (location) => {
        return {
            '_id': location._id,
            'name': location.name,
            'is_default': location.is_default,
            'created_at': new Date(location.created_at),
            'updated_at': new Date(location.updated_at)
        };
    }

    /**
     * 
     * @param {*} locations 
     * @returns array
     */
    static transformCollection = (locations) => {
        let transformed = []

        locations.forEach(location => {
            transformed.push(this.transform(location))
        });

        return transformed
    }
}

export default LocationTransformer