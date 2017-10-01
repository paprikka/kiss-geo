const restify = require('restify');
const geo = require('./routes/geo')
const server = restify.createServer()

const withAPIToken = require('./middleware/auth')

server.get('/ip/:ip', withAPIToken, geo)

server.listen(process.env.PORT || 3006, function() {
  console.log('%s listening at %s', server.name, server.url)
});