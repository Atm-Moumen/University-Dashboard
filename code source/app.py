from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json

from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '123456'
app.config['MYSQL_DATABASE_DB'] = 'db_university'

mysql.init_app(app)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def doGetData():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT ANNEE, COUNT(*) as nbr FROM resultats GROUP BY ANNEE")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)

@app.route('/api/data1')
def doGetData1():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT SEXe, COUNT(*) as nbr FROM resultats GROUP BY SEXE")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)

@app.route('/api/data2')
def doGetData2():
    data = {"years": [], "datasets": []}

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT ANNEE FROM resultats")

    years_tuple = cursor.fetchall()
    years_list = [item[0] for item in years_tuple]
    data["years"] = years_list

    cursor.execute("SELECT DISTINCT SPECIALITE FROM resultats")

    spec_tuple = cursor.fetchall()
    spec_list = [item[0] for item in spec_tuple]

    for spec in spec_list:
        cursor.execute("SELECT COUNT(*) FROM resultats WHERE SPECIALITE='"+spec+"' GROUP BY ANNEE")
        nbr_tuple = cursor.fetchall()
        nbr_list = [item[0] for item in nbr_tuple]
        data["datasets"].append({"label": spec, "data": nbr_list})

    data_JSON = json.dumps(data)
    return data_JSON

@app.route('/api/data4')
def doGetData4():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT ANNEE,COUNT(ANNEE) as nbr FROM resultats WHERE MOYENNE >= 10 GROUP BY ANNEE")

    data = cursor.fetchall()
    row_headers = [x[0] for x in cursor.description]

    cursor.close()

    json_data = []
    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

