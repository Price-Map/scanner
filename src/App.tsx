import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import './App.css';
import Html5QrcodePlugin from './QRCodePlugin';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

const App = (props: any) => {
    const onNewScanResult: QrcodeSuccessCallback = (decodedText: string, decodedResult: Html5QrcodeResult) => {
        console.log("App [result]", decodedResult);
        postData('https://pricemap.netlify.app/.netlify/functions/push', { data: decodedText })
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <div className="App">
            <section className="App-section">
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={300}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </section>
        </div>
    );
};

export default App;
