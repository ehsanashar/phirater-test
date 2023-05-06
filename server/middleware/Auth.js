import jwt from 'jsonwebtoken'

const Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        let decodedData;

        if(token) {
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData.id;
        }

        next();
    } catch (error) {
        res.status(401).send({'message': 'Sign in to proceed.'})
    }
}

export default Auth