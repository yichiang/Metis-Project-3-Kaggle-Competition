from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine

from sklearn.linear_model import LogisticRegression
import numpy as np
import pandas as pd
import os
import pickle
#---------- MODEL IN MEMORY ----------------#
# create your own connection, use '\list' in psql to find the name and owner of the database
cnx = create_engine('postgresql://yichiang:yichiang@52.206.3.40:5432/adtracking')

with open("../../randForest_best_model.pkl", 'rb') as picklefile:
    PREDICTOR = pickle.load(picklefile)


#---------- URLS AND WEB PAGES -------------#

# Initialize the app
template_dir = os.path.abspath('')
app = Flask(__name__, template_folder=template_dir, static_url_path='/static')
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Homepage
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data", methods=["Get"])
def getData():
    skipCount = request.args.get('skip');
    if skipCount is None:
         skipCount = 0

    pagesize = request.args.get('pagesize');
    if pagesize is None:
         pagesize = 10

    ip = request.args.get('ip');
    if ip is None:
         ip = ''
    channel = request.args.get('channel');
    if channel is None:
         channel = ''
    sqlQuery = '''SELECT * FROM public.activity WHERE device> 0 '''
    sqlQuery += ''' AND ip in ('''+ip+''')''' if len(ip) > 0 else ''
    sqlQuery += (''' AND  channel = ''' + channel ) if len(channel) > 0 else ''
    sqlQuery +=''' ORDER BY click_time DESC OFFSET '''+skipCount+''' LIMIT '''+pagesize
    print("sqlQuery %s" %sqlQuery)
    print("------------ ")

    activity = pd.read_sql_query(sqlQuery,cnx)
    # list_of_dictionaries = [activity.iloc[line,:].T.to_dict() for line in range(len(activity))].tolist()
    return activity.to_json(orient='table')

@app.route("/api/data/app", methods=["Get"])
def getAppCountData():
    activity = pd.read_sql_query('''SELECT * FROM AdGroupByApp_view''',cnx)
    # list_of_dictionaries = [activity.iloc[line,:].T.to_dict() for line in range(len(activity))].tolist()
    return activity.to_json(orient='table')

@app.route("/api/data/ip", methods=["Get"])
def getIpCountData():
    activity = pd.read_sql_query('''SELECT * FROM AdGroupByIP_view''',cnx)
    # list_of_dictionaries = [activity.iloc[line,:].T.to_dict() for line in range(len(activity))].tolist()
    return activity.to_json(orient='table')

@app.route("/api/data/hour", methods=["Get"])
def getHourCountData():
    activity = pd.read_sql_query('''SELECT * FROM adgroupbyhour_view''',cnx)
    # list_of_dictionaries = [activity.iloc[line,:].T.to_dict() for line in range(len(activity))].tolist()
    return activity.to_json(orient='table')


@app.route("/api/data/ip/all", methods=["Get"])
def getAllIpsData():
    activity = pd.read_sql_query('''SELECT DISTINCT ip FROM activity LIMIT 20''',cnx)
    # list_of_dictionaries = [activity.iloc[line,:].T.to_dict() for line in range(len(activity))].tolist()
    return activity.to_json(orient='values')

# Get an example and return it's score from the predictor model
@app.route("/api/score", methods=["POST"])
def score():
    # Get decision score for our example that came with the request
    data = request.json
    print("data!!!!!!!!!%s"%data)
    x = np.matrix([data["ip"], data["app"],data["device"],data["os"],data["channel"],data["hour"]])
    score = PREDICTOR.predict_proba(x)
    # Put the result in a nice dict so we can send it as json
    results = {"score": score[0,1]}
    return jsonify(results)

#--------- RUN WEB APP SERVER ------------#

# Start the app server on port 80
# (The default website port)
app.run(host='0.0.0.0')
app.run(debug=True)
