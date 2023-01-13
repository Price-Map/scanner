import { QRCodeCoupon } from '../../types/QRCodeCoupon';

import { cleanEnv, str, } from 'envalid'

const env = cleanEnv(process.env, {
    REACT_APP_BACKEND_URL: str({ default: 'http://localhost:8080' }),
})

// console.log("env", env)

export function saveCoupon(data: QRCodeCoupon){
    return fetch(`${env.REACT_APP_BACKEND_URL}/save-coupon`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}