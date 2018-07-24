#!/usr/bin/env python
# Arnau Plans Castello

import sys
reload(sys)
sys.setdefaultencoding('utf8')

from flask import Flask
from flask import *

app = Flask(__name__)

# Main route
@app.route('/')
def main(name=None):
	return render_template("start.html", name=name)

@app.route('/play')
def play(name=None):
    return render_template("play.html", name=name)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80,  threaded=True)
