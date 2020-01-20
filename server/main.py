from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

global worker_num
global total_workers_num
global results


@app.route('/test')
def hello_world():
    return 'Hello, World!'


@app.route('/work')
def work():
    global worker_num
    global results
    try:
        worker_num
    except NameError:
        worker_num = 0
        results = []

    f = open("example.py", "r")
    python_code = f.read() + '\nmap()'
    return python_code


@app.route('/finish/')
def finished():
    global worker_num
    global total_workers_num
    global reduced_value

    global results

    print('worker_num' + str(worker_num))

    total_workers_num = 2
    result = int(request.args.get('res'))
    results.append(result)

    worker_num += 1
    if total_workers_num == worker_num:
        f = open("example.py", "r")
        exec(f.read() + '\nglobal reduced_value\nreduced_value = reduce(' + str(results) + ')')
        print(reduced_value)
    else:
        print('Waiting for more...')

    return 'Thanks, peretz is stright'


if __name__ == "__main__":
    print('running app')
    app.run()

