import React from "react";
import logo from "../logo.svg";
import "./App.css";
/* eslint import/no-webpack-loader-syntax: off */
import Python from 'worker-loader!../pythonWorker/python.worker';
import openSocket from 'socket.io-client'


const App: React.FC = () => {
    const socket = openSocket('http://localhost:5000');
    for (let i = 0; i < 10; i++)
        socket.emit('connect', "peretz is gay");
    socket.on('work', (work_msg: string) => {
        console.log(work_msg)
    });


    fetch("http://localhost:5000/work")
        .then(res => res.text())
        .then((pythonScript) => {
            const pyodideWorker = new Python();
            pyodideWorker.onmessage = e => {
                const {results, error} = e.data;
                if (results) {
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
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default App;
