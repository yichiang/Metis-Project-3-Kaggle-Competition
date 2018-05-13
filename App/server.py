from flask import Flask, render_template
from sklearn.linear_model import LogisticRegression
import numpy as np
import pandas as pd
import os

#---------- MODEL IN MEMORY ----------------#

# Read the scientific data on breast cancer survival,
# Build a LogisticRegression predictor on it
patients = pd.read_csv("haberman.data", header=None)
patients.columns=['age','year','nodes','survived']
patients=patients.replace(2,0)  # The value 2 means death in 5 years, update to more common 0

X = patients[['age','year','nodes']]
Y = patients['survived']
PREDICTOR = LogisticRegression().fit(X,Y)


#---------- URLS AND WEB PAGES -------------#

# Initialize the app
# template_dir = os.path.abspath('build')
app = Flask(__name__, static_url_path='/build/static')

# Homepage
@app.route("/")
def index():
    return render_template("index.html")

# Get an example and return it's score from the predictor model
@app.route("/score", methods=["GET"])
def score():
    """
    When A POST request with json data is made to this uri,
    Read the example from the json, predict probability and
    send it with a response
    """
    # Get decision score for our example that came with the request
    data = flask.request.json
    x = np.matrix(data["example"])
    score = PREDICTOR.predict_proba(x)
    # Put the result in a nice dict so we can send it as json
    results = {"score": score[0,1]}
    return flask.jsonify(results)

#--------- RUN WEB APP SERVER ------------#

# Start the app server on port 80
# (The default website port)
app.run(host='0.0.0.0')
app.run(debug=True)
