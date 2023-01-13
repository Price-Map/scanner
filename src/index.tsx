import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { scanner, ScannerContext } from './context/ScannerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ScannerContext.Provider value={scanner}>
        <App />
    </ScannerContext.Provider>
  </React.StrictMode>
);
