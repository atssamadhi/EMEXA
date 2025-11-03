from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Simple CORS - allow all
CORS(app, origins="*")

@app.route('/')
def hello():
    return {'message': 'Hello, World!'}

@app.route('/test')
def test():
    return {'test': 'success'}

if __name__ == '__main__':
    print("Starting minimal Flask server on port 5001...")
    app.run(debug=True, host='127.0.0.1', port=5001, use_reloader=False)
