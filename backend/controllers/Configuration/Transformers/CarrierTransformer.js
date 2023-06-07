
const CarrierTransformer = class {

    /**
     * 
     * @param {*} carrier 
     * @returns 
     */
    static transform = (carrier) => {
        return {
            '_id': carrier._id,
            'name': carrier.name,
            'country': carrier.country,
            'address': carrier.address,
            'city': carrier.city,
            'postal_code': carrier.postal_code,
            'vat': carrier.vat,
            'phone': carrier.phone,
            'currency': carrier.currency,
            'created_at': new Date(carrier.created_at),
            'updated_at': new Date(carrier.updated_at)
        };
    }

    /**
     * 
     * @param {*} carriers 
     * @returns array
     */
    static transformCollection = (carriers) => {
        let transformed = []

        carriers.forEach(carrier => {
            transformed.push(this.transform(carrier))
        });

        return transformed
    }
}

export default CarrierTransformer