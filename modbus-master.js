import {DiscreteInput, Coil, HoldingRegister, InputRegister} from './register'
import registers from './registers-list'

export function monitor(slave, interval, callback) {
    setInterval(() => readRegisters(slave, callback), interval)
}

function readRegisters(slave, callback){
    let regs = [];
    let readValues = {};
    for (let module in registers){
        for (let dataPoint in registers[module]){
            regs.push(createRegisterObject(dataPoint, slave, registers[module][dataPoint]));
        }
    }
    (async () => {
        for (let reg of regs){
            try{
                const {data} = await reg.read();
                readValues[reg.getName()] = (reg.scale == null) ? data[0] : data[0]/reg.scale //TODO considers only 1st register
            } catch (e) {
                console.log(e);
            }
        }
        return callback(readValues);
    })();
}

function createRegisterObject(name, slave, {type, address, length, scale}) {
    switch (type) {
        case 1:
            return new DiscreteInput(name, slave, address, length);
        case 2:
            return new Coil(name, slave, address, length);
        case 3:
            return new InputRegister(name, slave, address, length, scale);
        case 4:
            return new HoldingRegister(name, slave, address, length, scale);
        default:
            throw new Error('Not valid register type')
    }
}

// connect().then(slave => {
//     monitor(slave, 6000);
// }).catch(e => {
//     console.log("Could not connect to slave device", e)
// });