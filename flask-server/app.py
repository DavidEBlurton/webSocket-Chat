from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app,
cors_allowed_origins='*')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(data):       
    print(f'Message received: {data}')
    socketio.emit('message', data)
# emit - send the message back to every client connected to the server.  first parameter is the type of event to emit, 2nd is the data
    
if __name__ == '__main__':
    socketio.run(app)