const express = require('express')
const app = express()
const personRoute = require('./src/routes/persona.route.js')

app.use(express.json());

app.use('/api/v1/personas', personRoute);

app.listen(3000, console.log('SERVIDOR ENCENDIDO'))

module.exports = app;