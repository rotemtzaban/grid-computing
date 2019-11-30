from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
# app.config['SECRET_KEY'] = 'fuck_peretz!'
socket = SocketIO(app, cors_allowed_origins='*')


@app.route('/test')
def hello_world():
    return 'Hello, World!'


@app.route('/work')
def work():
    return 'import numpy as np\nnp.array([1, 3, 5])\nnp.version.version'


@socket.on('connect')
def on_connect():
    print("peretz is gay")
    emit('work', 'import numpy as np\nnp.array([1, 3, 5])\nnp.version.version')


if __name__ == "__main__":
    print('running app')
    socket.run(app)

