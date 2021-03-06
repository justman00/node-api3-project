// require your server and launch it
const server = require('./api/server');
const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`SERVER is listening at port ${PORT}...`)
})
