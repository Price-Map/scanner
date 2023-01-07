import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import './App.css';
import Html5QrcodePlugin from './QRCodePlugin';

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}



const App = (props: any) => {
    //const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult: QrcodeSuccessCallback = (decodedText: string, decodedResult: Html5QrcodeResult) => {
        console.log("App [result]", decodedResult);
        postData('https://pricemap.netlify.app/.netlify/push', { data: decodedResult })
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
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
