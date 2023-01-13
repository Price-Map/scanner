import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Html5QrcodePlugin from './components/QRCodePlugin';

const App = () => {
    return (
        <div className="App">
            <section className="App-section">
                <Html5QrcodePlugin />
            </section>
        </div>
    );
};

export default App;
