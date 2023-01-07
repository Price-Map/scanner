const ResultContainerTable = (props: any) => {
    const results: any[] = props.results;
    return (
        <table className={'Qrcode-result-table'}>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Decoded Text</td>
                    <td>Format</td>
                </tr>
            </thead>
            <tbody>
                {
                    results.map((result, i) => {
                        console.log(result);
                        return (<tr key={i}>
                            <td>{i}</td>
                            <td>{result.decodedText}</td>
                            <td>{result.result.format.formatName}</td>
                        </tr>);
                    })
                }
            </tbody>
        </table>
    );
};

const ResultContainerPlugin = (props: any) => {
    const results: any[] = props.results;
    return (
        <div className='Result-container'>
            <div className='Result-header'>Scanned results ({results.length})</div>
            <div className='Result-section'>
                <ResultContainerTable results={results}/>
            </div>
        </div>
    );
};

export default ResultContainerPlugin;
