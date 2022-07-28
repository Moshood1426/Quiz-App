const { UnauthenticatedError } = require("../errors")
const { verifyJWT } = require("../utils/jwt")

const authenticateUser = (req, res, next) => {
    const { token } = req.signedCookies
    
    if(!token) {
        throw new UnauthenticatedError("Authentication Invalid")
    }

    try {
        const payload = verifyJWT(token)
        req.user = {
            userId: payload.id
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid")
    }
}

module.exports = authenticateUser