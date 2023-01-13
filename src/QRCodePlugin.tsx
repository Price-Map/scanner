import { Html5Qrcode } from 'html5-qrcode';
import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
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
    const [enableCamera, setEnableCamera] = useState(false);

    useEffect(() => {
        const onNewScanResult: QrcodeSuccessCallback = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
            const data = {
                url: decodedText,
                code: decodedText.match(CODE_REGEXP)?.[0] ?? ''
            };
            console.log("App data", data);
            if (enableCamera) {
                await scanner.scanner?.stop();
                scanner.scanner?.clear();
                setEnableCamera(false)
                await postData(PRICE_MAP_URL, data);
            }

        };

        if (enableCamera && !scanner.scanner) {
            console.log("rendering")
            scanner.scanner = new Html5Qrcode(scanner.id)
            scanner.scanner.start({ facingMode: "environment" }, config, onNewScanResult, undefined).catch(console.error);
        }

        return () => {
            scanner.scanner?.clear();
            scanner.scanner = undefined
        };
    }, [scanner, enableCamera, setEnableCamera]);

    const onClick = useCallback(() => {
        setEnableCamera(true);
    }, [setEnableCamera]);

    return (
        <>
            <Button variant="primary" onClick={onClick}>
                Escanear QR Code
            </Button>
            {enableCamera ? <div id={scanner.id} /> : <></>}
        </>
    );
};

export default Html5QrcodePlugin;
