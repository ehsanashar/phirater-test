
const CategoryTransformer = class {

    /**
     * 
     * @param {*} category 
     * @returns 
     */
    static transform = (category) => {
        return {
            '_id': category._id,
            'name': category.name,
            'is_default': category.is_default,
            'created_at': new Date(category.created_at),
            'updated_at': new Date(category.updated_at)
        };
    }

    /**
     * 
     * @param {*} categories 
     * @returns array
     */
    static transformCollection = (categories) => {
        let transformed = []

        categories.forEach(category => {
            transformed.push(this.transform(category))
        });

        return transformed
    }
}

export default CategoryTransformer