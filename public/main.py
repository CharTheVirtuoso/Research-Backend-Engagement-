import json , time
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import requests
import shutil
import numpy as np
import os
import pickle
from tensorflow.keras.utils import custom_object_scope
import math
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import datetime
import numpy as np
import random

with open('feedback_model.dat' , 'rb') as f:
    feedback_model = pickle.load(f)

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
@app.route('/feedback', methods=['POST'])
def feedback():
    
        request_data = request.get_json()

        text = str(request_data['text'])
        print(text)
        print(request_data)

        res_text = feedback_model.predict([text])

        json_dump = json.dumps({"res_text":str(res_text[0]),"success":"true"})

        return json_dump
        

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=2222)