import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import './App.css';
import Html5QrcodePlugin from './QRCodePlugin';

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

const App = (props: any) => {
    const onNewScanResult: QrcodeSuccessCallback = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        const data = {
            url: decodedText,
            code: decodedText.match(CODE_REGEXP)?.[0] ?? ''
        };

        console.log("App data", data);

        await postData(PRICE_MAP_URL, data)
    };

    return (
        <div className="App">
            <section className="App-section">
                <Html5QrcodePlugin
                    fps={20}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </section>
        </div>
    );
};

export default App;
