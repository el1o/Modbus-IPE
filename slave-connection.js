import ModbusRTU from 'modbus-serial'
import {slaveConfig} from "./config";

let client = new ModbusRTU();

export default async function connect() {
    client.setTimeout(2000);
    client.setID(1);
    await client.connectRTU(slaveConfig.port, {baudRate: slaveConfig.baudRate, parity: slaveConfig.parity});
    return client;
}