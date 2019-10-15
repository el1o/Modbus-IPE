import bodyParser from 'body-parser';
import express from 'express';

import {uploadMonitoringData} from './http-agent';
import {monitor, writeCharging, writeDischarging} from './modbus-master';
import connect from "./slave-connection";

connect().then(slave => {
    monitor(slave, 6000, uploadMonitoringData);

    const app = express();
    const port = 3001;
    app.use(bodyParser.json());

    // app.post('/charging', async function(req, res) {
    //     const chargingValue = req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["charging"];
    //     if (chargingValue === 0 || 1){
    //         const data = await writeCharging(slave, chargingValue);
    //         console.log(data);
    //     }
    //     res.sendStatus(200);
    // });
    // app.post('/discharging', async function(req, res) {
    //     const dischargingValue = req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["discharging"];
    //     if (dischargingValue === 0 || 1){
    //         const data = await writeDischarging(slave, dischargingValue);
    //         console.log(data);
    //     }
    //     res.sendStatus(200);
    // });

    app.post('/write', async function(req, res) {
        let chargingValue, dischargingValue;
        if (req.body["m2m:sgn"].hasOwnProperty('m2m:nev')) {
            if (req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"].hasOwnProperty('charging')) {
                chargingValue = Number(req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["charging"]);
                // console.log('IF charging');
            }
            if (req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"].hasOwnProperty('discharging')) {
                dischargingValue = Number(req.body["m2m:sgn"]["m2m:nev"]["m2m:rep"]["m2m:fcnt"]["discharging"]);
                // console.log('IF discharging');
            }
        }

        if (chargingValue === 0 || 1 && chargingValue !== undefined){
            const data = await writeCharging(slave, chargingValue);
            console.log('charging:' + JSON.stringify(data));
        } else if (dischargingValue === 0 || 1 && dischargingValue !== undefined){
            const data = await writeDischarging(slave, dischargingValue);
            console.log('discharging:' + JSON.stringify(data));
        }
        res.sendStatus(200);
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}).catch(e => {
    console.log("Could not connect to slave device", e);
});