import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrcodePlugin = (props: any) => {

    useEffect(() => {
        const config: any = {
            fps: props.fps,
            qrbox: props.qrbox,
            disableFlip: props.disableFlip,
            //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        };

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, false);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    });

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;
