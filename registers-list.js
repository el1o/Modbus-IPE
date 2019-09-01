/*
register types:
    1 - Discrete input (R)
    2 - Coil (R&W)
    3 - Input register (R)
    4 - Holding register (R&W)
 */
export default {
    battery: {
        level: {
            address: 0x311A,
            type: 3,
            length: 1
        },
        capacity: {
            address: 0x9001,
            type: 4,
            length: 1
        },
        // charging: {},
        // discharging: {},
        // batteryThreshold: {},
        electricEnergy: {
            address: 0x331B,
            type: 3,
            length: 1
        },
        voltage: {
            address: 0x331A,
            type: 3,
            length: 1,
            scale: 100
        }
    }
}