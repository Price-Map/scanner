import { Html5Qrcode } from 'html5-qrcode';
import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import { useContext, useEffect } from 'react';
import { config, ScannerContext } from './ScannerContext';


const PRICE_MAP_URL = 'https://pricemap.netlify.app/.netlify/functions/push';
const CODE_REGEXP = /\d{44}/;

export interface Data {
    code: string
    url: string
};

async function postData(url: string, data: Data) {
    await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const Html5QrcodePlugin = (props: any) => {
    const scanner = useContext(ScannerContext)
    

    useEffect(() => {
        const onNewScanResult: QrcodeSuccessCallback = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
            const data = {
                url: decodedText,
                code: decodedText.match(CODE_REGEXP)?.[0] ?? ''
            };
            console.log("App data", data);
            await postData(PRICE_MAP_URL, data);
            scanner.scanner?.clear();
        };

        if (!scanner.scanner) {
            console.log("rendering")
            scanner.scanner = new Html5Qrcode(scanner.id)
            scanner.scanner.start({ facingMode: "environment" }, config, onNewScanResult, undefined);
        }

        // cleanup function when component will unmount
        return () => {
            scanner.scanner?.clear();
        };
    }, [scanner]);

    return (
        <div id={scanner.id} />
    );
};

export default Html5QrcodePlugin;
