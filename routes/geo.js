const geoip = require('geoip-lite')
const {
    BadRequestError,
    NotFoundError
} = require('restify-errors')

module.exports = (req, res, next) => {
    const ip = req.params.ip
    if(!ip) return next(new NotFoundError())

    const geo = geoip.lookup(ip)
    if(!geo) return next(
        new BadRequestError('Invalid IP addrees. Cannot find a match.')
    )

    res.send({geo: geo})
}