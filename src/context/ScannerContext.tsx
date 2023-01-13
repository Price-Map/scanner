import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { createContext } from 'react';

export interface IScannerContext {
    id: string
    scanner?: Html5Qrcode
};

export const config: any = {
  fps: 20,
  qrbox: 300,
  disableFlip: false,
  formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
  //supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
};

export const scanner: IScannerContext = {
    id: "html5qr-code-full-region",
    //scanner: new Html5Qrcode(qrcodeRegionId)
  }

export const ScannerContext = createContext<IScannerContext>(scanner);
