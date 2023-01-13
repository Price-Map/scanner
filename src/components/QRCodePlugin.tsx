import { Html5Qrcode } from 'html5-qrcode';
import { Html5QrcodeResult, QrcodeSuccessCallback } from 'html5-qrcode/esm/core';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { config, ScannerContext } from '../context/ScannerContext';
import { saveCoupon } from '../services/coupon';

const CODE_REGEXP = /\d{44}/;

const Html5QrcodePlugin = (props: any) => {
    const scanner = useContext(ScannerContext)
    const [enableCamera, setEnableCamera] = useState(false);

    const onNewScanResult: QrcodeSuccessCallback = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        const data = {
            url: decodedText,
            code: decodedText.match(CODE_REGEXP)?.[0] ?? ''
        };
       
        //console.log("App data", data);
        if (enableCamera) {
            setEnableCamera(false)

            try{
                const response = await saveCoupon(data)
                // console.log(response);
                console.log("Success");
                alert("Cupom salvo com sucesso!");
            } catch (e) {
                console.error(e);
                alert("Erro ao salvar cupom!");
            }
        }
    };

    useEffect(() => {
        if (enableCamera) {
            scanner.scanner = new Html5Qrcode(scanner.id)
            scanner.scanner?.start({ facingMode: "environment" }, config, onNewScanResult, undefined).catch(console.error);
        }

        return () => {
            scanner.scanner?.stop().then(() => {
                scanner.scanner?.clear();
                scanner.scanner = undefined
            })
        };
    }, [scanner, enableCamera]);

    const enableScan = () => setEnableCamera(true);
    const disableScan = () => setEnableCamera(false);

    return (
        <>
            {enableCamera ?
                <>
                    <div id={scanner.id} />
                    <Button variant="secondary" onClick={disableScan} disabled={!enableCamera}>
                        Cancelar
                    </Button>
                </>
                :
                <Button variant="primary" onClick={enableScan} disabled={enableCamera}>
                    Escanear QR Code
                </Button>
            }
        </>
    );
};

export default Html5QrcodePlugin;
