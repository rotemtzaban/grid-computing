import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Python from 'worker-loader!./python.worker.js';

declare var languagePluginLoader: any;
declare var pyodide: any;

const App: React.FC = () => {
  fetch("http://localhost:5000/work")
    .then(res => res.text())
    .then((pythonScript) => {
      const pyodideWorker = new Worker("./python.worker.js");
      pyodideWorker.onmessage = e => {
        const { results, error } = e.data;
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
  // languagePluginLoader.then(async () => {
  //   // pyodide is now ready to use...
  //   console.log("init done");
  //   console.log(pyodide.runPython("import sys\nsys.version"));
  //   console.log(pyodide.runPython('[4, 5, "uasd"]'));
  //   await pyodide.loadPackage(["numpy"]);
  //   console.log(pyodide.runPython("import numpy as np"));
  //   const work = await fetch("http://localhost:5000/work");
  //   const workText = await work.text();
  //   print(workText);
  // });

  // function print(str: string) {
  //   console.log(pyodide.runPython(str));
  // }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
