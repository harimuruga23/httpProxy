const express = require('express');
const axios = require('axios')
const cors = require('cors')
const app = express();
const PORT = 8080;
app.use(express.json());


app.use(cors());


app.post('/', async (req, res) => {
    const body = req.body;

    const data = {
        installationId: null,
        token: null,
        readings: {
            ph: null,
            orp: null,
            tds: null,
            turbidity: null,
            cod: null,
            bod: null,
            tss: null,
            inlet: null,
            outlet: null
        }
    }

    data.installationId = body.installationId
    data.token = body.token
    data.readings.ph = body.ph
    data.readings.orp = body.orp
    data.readings.tds = body.tds
    data.readings.turbidity = body.turbidity
    data.readings.cod = body.cod
    data.readings.bod = body.bod
    data.readings.tss = body.tss
    data.readings.inlet = body.inlet
    data.readings.outlet = body.outlet


    let responseF = null
    await axios.post('https://us-central1-ekki-rtm.cloudfunctions.net/reading', { data: data })
        .then(function (response) {
            console.log(response);
            responseF = response
        })
        .catch(function (error) {
            console.log(error);
            responseF = error
        });

    // return responseF
    res.send({ status: responseF.statusCode })
});


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);