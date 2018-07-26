#!/usr/bin/env python
# Arnau Plans Castello

import random
from flask import Flask, render_template, jsonify, redirect, url_for, make_response
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)
LENGTH = 4

@socketio.on('connect')
def handle_connection():
    options = ["YELLOW", "BLUE", "PURPLE", "RED", "GREEN"]
    PATTERN = [random.choice(options) for _ in range(LENGTH)]

    msg = "PATTERN" + "," + PATTERN[0] + "," + PATTERN[1] + "," + PATTERN[2] + "," + PATTERN[3]
    send(msg)

@socketio.on('message')
def handleMessage(msg):
    if msg != "GAME_OVER":
        s_msg = msg.split(",")
        guess = [s_msg[1], s_msg[2], s_msg[3], s_msg[4]]
        pattern = [s_msg[5], s_msg[6], s_msg[7], s_msg[8]]

        black=0
        white=0
        for n in range(LENGTH):
            if guess[n] == pattern[n]:
                black+=1
            else:
                if guess[n] in pattern:
                    white+=1

        msg = "RESPONSE" + "," + str(black)  + "," + str(white)
        if black == LENGTH and white == 0:
            send("WIN")
        else:
            send(msg)
# Main route
@app.route('/')
def main(name=None):
    return redirect(url_for('start'))

@app.route('/start')
def start(name=None):
    return render_template("start_game.html", name=name)

@app.route('/play')
def play(name=None):
    return render_template("play_game.html", name=name)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)