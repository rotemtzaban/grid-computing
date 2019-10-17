languagePluginLoader.then(async () => {
    // pyodide is now ready to use...
    console.log("init done");
    console.log(pyodide.runPython("import sys\nsys.version"));
    console.log(pyodide.runPython('[4, 5, "uasd"]'));
    await pyodide.loadPackage(["numpy"]);
    console.log(pyodide.runPython("import numpy as np"));
    const work = await fetch('http://localhost:5000/work');
    const workText = await work.text();
    print(workText);
});

function print(str) {
    console.log(pyodide.runPython(str));
}
