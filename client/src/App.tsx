import React from "react";
import logo from "./logo.svg";
import "./App.css";
declare var languagePluginLoader: any;
declare var pyodide: any;
const App: React.FC = () => {
  languagePluginLoader.then(async () => {
    // pyodide is now ready to use...
    console.log("init done");
    console.log(pyodide.runPython("import sys\nsys.version"));
    console.log(pyodide.runPython('[4, 5, "uasd"]'));
    await pyodide.loadPackage(["numpy"]);
    console.log(pyodide.runPython("import numpy as np"));
    const work = await fetch("http://localhost:5000/work");
    const workText = await work.text();
    print(workText);
  });

  function print(str: string) {
    console.log(pyodide.runPython(str));
  }
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
