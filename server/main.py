from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
# app.config['SECRET_KEY'] = 'fuck_peretz!'
socket = SocketIO(app, cors_allowed_origins='*')

global worker_num
global total_workers_num
global total

@app.route('/test')
def hello_world():
    return 'Hello, World!'


@app.route('/work')
def work():
    global worker_num
    global total
    try:
        worker_num
    except NameError:
        worker_num = 0
        total = 0



    f = open("example.py", "r")
    python_code = f.read() + '\nmain()'
    return python_code

@app.route('/finish/')
def finished():
    global worker_num
    global total_workers_num
    global total

    print('worker_num' + str(worker_num))


    total_workers_num = 3
    a = int(request.args.get('res'))
    total += a
    worker_num += 1
    if total_workers_num == worker_num:
        print(total)
    else:
        print('Waiting for more...')

    return 'Thanks, peretz is stright'

# @socket.on('connect')
# def on_connect():
#     print("peretz is gay")
#     emit('work', 'import numpy as np\nnp.array([1, 3, 5])\nnp.version.version')


if __name__ == "__main__":
    print('running app')
    socket.run(app)

