import {uploadMonitoringData} from './http-agent';
import {monitor} from './modbus-master'
import connect from "./slave-connection";

connect().then(slave => {
    monitor(slave, 6000, uploadMonitoringData)
}).catch(e => {
    console.log("Could not connect to slave device", e)
});