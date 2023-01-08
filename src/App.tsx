import './App.css';
import Html5QrcodePlugin from './QRCodePlugin';

const App = (props: any) => {
    return (
        <div className="App">
            <section className="App-section">
                <Html5QrcodePlugin
                    fps={20}
                    qrbox={250}
                    disableFlip={false}
                />
            </section>
        </div>
    );
};

export default App;
