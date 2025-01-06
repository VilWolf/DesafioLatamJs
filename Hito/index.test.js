const personRoute = require('./src/routes/persona.route.js')

describe("GET /", () => {

    describe("se entregan las personas", () => {

        test ("deberia responder con un 200", async () => {
            const response = await personRoute.get('/')
            console.log(response)
        })
    })
})

describe("GET /:id", () => {

    describe("se entrega una persona en especifico", () => {

        test ("deberia responder con un 200", async () => {
            const response = await personRoute.get('/1')
            console.log(response)
        })
    })
})