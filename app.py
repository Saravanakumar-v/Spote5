import os
import json
import model as md
import pandas as pd
from flask import Flask,render_template,request,send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/music-app",methods=['GET','POST'])
def musicapp():
    return render_template("index.html")
    

@app.route("/recommend",methods=['GET', 'POST'])
def recommendation():
    js = request.get_json()
    data = pd.read_csv("./data/data.csv")
    with open('./static/data/input.json',"w") as f:
        json.dump(js,f,ensure_ascii=False)
    
    
    f= open('./static/data/input.json')
    input = json.load(f);

    outfile = md.recommend_songs(input,  data)
    with open('./static/data/output.json',"w") as f:
        json.dump(outfile,f,ensure_ascii= False)
    
    return (' ', 204)


if __name__ == '__main__':
    app.run(debug= True)

