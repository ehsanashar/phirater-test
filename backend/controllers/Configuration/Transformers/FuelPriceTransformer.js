
const FuelPriceTransformer = class {

    /**
     * 
     * @param {*} fuelPrice 
     * @returns 
     */
    static transform = (fuelPrice) => {
        console.log(fuelPrice)
        return {
            '_id': fuelPrice._id,
            'price': fuelPrice.price,
            'carrier': fuelPrice.carrier.name,
            'valid_from': fuelPrice.valid_from,
            'valid_until': fuelPrice.valid_until,
            'created_at': new Date(fuelPrice.created_at),
            'updated_at': new Date(fuelPrice.updated_at)
        };
    }

    /**
     * 
     * @param {*} fuelPrices 
     * @returns array
     */
    static transformCollection = (fuelPrices) => {
        let transformed = []

        fuelPrices.forEach(fuelPrice => {
            transformed.push(this.transform(fuelPrice))
        });

        return transformed
    }
}

export default FuelPriceTransformer