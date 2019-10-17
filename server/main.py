from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/test')
def hello_world():
    return 'Hello, World!'


@app.route('/work')
def work():
    return 'np.version.version\nnp.array([1, 3, 5])'


app.run()
