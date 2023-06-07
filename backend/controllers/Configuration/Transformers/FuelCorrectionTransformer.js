
const FuelCorrectionTransformer = class {

    /**
     * 
     * @param {*} fuelCorrection 
     * @returns 
     */
    static transform = (fuelCorrection) => {
        return {
            '_id': fuelCorrection._id,
            'carrier': fuelCorrection.carrier.name,
            'from': fuelCorrection.from,
            'to': fuelCorrection.to,
            'correction': fuelCorrection.correction,
            'created_at': new Date(fuelCorrection.created_at),
            'updated_at': new Date(fuelCorrection.updated_at)
        };
    }

    /**
     * 
     * @param {*} fuelCorrections 
     * @returns array
     */
    static transformCollection = (fuelCorrections) => {
        let transformed = []

        fuelCorrections.forEach(fuelCorrection => {
            transformed.push(this.transform(fuelCorrection))
        });

        return transformed
    }
}

export default FuelCorrectionTransformer