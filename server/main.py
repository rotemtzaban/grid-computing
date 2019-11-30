from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'fuck_peretz!'
socketio = SocketIO(app)


@app.route('/test')
def hello_world():
    return 'Hello, World!'


@app.route('/work')
def work():
    return 'import numpy as np\nnp.array([1, 3, 5])\nnp.version.version'


if __name__ == "__main__":
    socketio.run(app)
