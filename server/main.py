import os
from flask import Flask, request, flash, redirect, url_for
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from werkzeug.utils import secure_filename


UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
#app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
#cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5000"}})

global worker_num
global total_workers_num
global results


@app.route('/test')
def hello_world():
    return 'Hello, World!'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
# @cross_origin()
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return "test"


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
        print('total result = ')
        print(reduced_value)
    else:
        print('Waiting for more...')

    return 'Thanks, peretz is stright'

# @socket.on('connect')
# def on_connect():
#     print("peretz is gay")
#     emit('work', 'import numpy as np\nnp.array([1, 3, 5])\nnp.version.version')


if __name__ == "__main__":
    print('running app')
    app.run()

