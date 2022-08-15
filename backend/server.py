from flask import Flask, request, jsonify
import database
from database import *
database.init_db()

app = Flask(__name__)

def serialize(results):
    return [scalar.serialize for scalar in results]

@app.route('/ideas')
def ideas():
    ideas_list = session.execute(select(Idea)).scalars().all()
    return jsonify(serialize(ideas_list))

@app.route('/cams')
def cams():
    cams_list = session.execute(select(Cams)).scalars().all()
    return jsonify(serialize(cams_list))

@app.route("/add", methods=["POST"])
def add_idea():

    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        # print(json)
        title = json.get("title")
        description = json.get("description")
        cams = json.get("cams")

    else:
        title = request.form.get("title")
        description = request.form.get("description")
        cams = request.form.get("cams")

    new_idea = Idea(title=title, description=description, cams=cams)

    if new_idea.title:
        session.add(new_idea)
        session.commit()
        return 'OK', 200
    else:
        return 'Error. Idea not added.', 400

# @app.route('/update/<int:todo_id>')
# def update_task(todo_id):
#     task = app.session.scalar(select(Todo).where(Todo.id == todo_id))
#     task.complete = not task.complete
#     app.session.commit()
#     return redirect(url_for("home"))

# @app.route('/delete/<int:todo_id>')
# def delete_task(todo_id):
#     task = app.session.scalar(select(Todo).where(Todo.id == todo_id))
#     app.session.delete(task)
#     app.session.commit()
#     return redirect(url_for("home"))

@app.route('/test')
def test_api():

    return {
        "testing":"test123"
        }

if __name__ == "__main__":
    database.init_db()
    app.run(debug=True)

