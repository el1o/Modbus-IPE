import request from 'request-promise';
import {cseUrl, fcntUrls} from './config'

export async function uploadMonitoringData(data) {
    let options = {
        method: 'PUT',
        uri: cseUrl.concat(fcntUrls.battery),
        port: 8080,
        body: {
            "m2m:fcnt": data
        },
        headers: {
            'Accept': 'application/json',
            'X-M2M-RI': 'ipe',
            'X-M2M-Origin': 'admin:admin',
            'Content-Type': 'application/json;ty=28'
        },
        json: true
    };
    try {
        return await request(options);
    } catch (e) {
        console.log('PUT request error: ', e);
    }
}