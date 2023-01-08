import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import { useEffect, useState } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

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
    const config: any = {
        fps: props.fps,
        qrbox: props.qrbox,
        disableFlip: props.disableFlip,
        //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };
    const scan: Html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, false);
    const [scanner, setScanner] = useState(scan);

    const onNewScanResult: QrcodeSuccessCallback = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        const data = {
            url: decodedText,
            code: decodedText.match(CODE_REGEXP)?.[0] ?? ''
        };

        console.log("App data", data);

        await postData(PRICE_MAP_URL, data);

        if (scanner) {
            await scanner.clear();
        }
    };

    if (scanner) {
        scanner.render(onNewScanResult, ()=>{});
    }

    useEffect(() => {
        setScanner(scanner)
        
        // cleanup function when component will unmount
        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [scanner]);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;
