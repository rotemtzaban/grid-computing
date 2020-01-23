import React from "react";
import Upload from "../Upload/Upload";
import logo from "../logo.svg";
import "./App.css";
/* eslint import/no-webpack-loader-syntax: off */
import Python from 'worker-loader!../pythonWorker/python.worker';
import openSocket from 'socket.io-client'


const App: React.FC = () => {


    fetch("http://localhost:5000/work")
        .then(res => res.text())
        .then((pythonScript) => {
            const pyodideWorker = new Python();
            pyodideWorker.onmessage = e => {
                const {results, error} = e.data;
                if (results) {
                    fetch('http://localhost:5000/finish/?res=' + results);
                    console.log("pyodideWorker return results: ", results);
                } else if (error) {
                    console.log("pyodideWorker error: ", error);
                }
            };

            const data = {
                A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
                python: pythonScript
            };

            pyodideWorker.postMessage(data);
        });

    return (
        <div className="App">
            <header className="App-header">
                {/* <Compute msg="kof"></Compute> */}
                <Upload></Upload>
            </header>
        </div>
    );
    

    
};



export default App;
