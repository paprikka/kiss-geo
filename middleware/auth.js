const {
    ForbiddenError
} = require('restify-errors')

const getAuthHeader = (req) => {
    if(!req.headers.authorization) return null
    return req.headers.authorization.split(' ')[1]
}


const isValidHeader = (authHeader) => {
    if( !authHeader ) return false
    if( typeof authHeader !== 'string' ) return false
    if( authHeader.trim() === process.env.API_TOKEN ) return true

    return false
}
module.exports = (req, res, next) => {
    const authHeader = getAuthHeader(req)
    const isValid = isValidHeader(authHeader)

    if(!isValid) return next( new ForbiddenError('Missing/invalid API token.') )
    next()
}
