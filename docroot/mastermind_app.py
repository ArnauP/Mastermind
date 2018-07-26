#!/usr/bin/env python
# Arnau Plans Castello

import os
import random
import json
from flask import Flask, render_template, jsonify, redirect, url_for, make_response
from flask_socketio import SocketIO, send, emit
from flask_mysqldb import MySQL

app = Flask(__name__)
# app.config['MySQL_HOST'] = os.environ["DB_HOST"]
# app.config['MySQL_USER'] = os.environ["DB_USER"]
# app.config['MySQL_PASSWORD'] = os.environ["DB_PSWD"]
# app.config['MySQL_DB'] = os.environ["DB_NAME"]
app.config['SECRET_KEY'] = 'mysecret'
mysql = MySQL(app)
socketio = SocketIO(app)
LENGTH = 4

@socketio.on('connect')
def handle_connection():
    options = ["YELLOW", "BLUE", "PURPLE", "RED", "GREEN"]
    PATTERN = [random.choice(options) for _ in range(LENGTH)]

    msg = "PATTERN" + "," + PATTERN[0] + "," + PATTERN[1] + "," + PATTERN[2] + "," + PATTERN[3]
    send(msg)


    # Create a new databse

    # Insert a new pattern in the database
    # cur = mysql.connection.cursor()
    # cur.execute("")


@socketio.on('message')
def handleMessage(msg):
    if msg != "GAME_OVER":
        s_msg = msg.split(",")
        guess = [s_msg[1], s_msg[2], s_msg[3], s_msg[4]]
        pattern = [s_msg[5], s_msg[6], s_msg[7], s_msg[8]]

        print guess
        print pattern

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
    # else:
    #     return redirect(url_for('game_over'))

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

# @app.route('/game_over')
# def game_over(name=None):
#     print "inside"
#     return render_template("game_over.html", name=name)

if __name__ == '__main__':
    socketio.run(app)