from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager 


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///api.db"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command("db", MigrateCommand)



class Todos(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    task = db.Column(db.String(100))
    
    def __str__(self):
        return self.task
    
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()


@app.route('/addTodo', methods=['POST'])
def add_todo():
    todo = request.get_json()
    add_todo = Todos(task = todo['todo'])
    db.session.add(add_todo)
    db.session.commit()
    print("todo added successfully")
    return "Todo Added Successfully"

@app.route('/getTodo', methods=['GET'])
def fetch_todo():
    todos = Todos.query.all()
    todoData = []
    setTodos = {}
    for todo in todos:
        setTodos = dict(id=todo.id, task=todo.task)
        todoData.append(setTodos)
    return jsonify({'tasks': todoData})

@app.route('/deleteTodo', methods=['POST'])
def delete_todo():
    todo = request.get_json()
    result = Todos.query.filter_by(id=todo['val']).first()
    db.session.delete(result)
    db.session.commit()
    return "Deleted successfully"

if __name__ == "__main__":
    app.run(debug=True)