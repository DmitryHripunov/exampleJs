class Employee {
  static lunchTimeStart = '13:00';
  static lunchTimeDuration = '1:00';
}

console.log(Employee.lunchTimeStart);
console.log(Employee.lunchTimeDuration);

class TodoItem {
  constructor(title, done = null, id = null) {
    this.title = title;
    this.done = done;
    this.id = id;
  };

  static async getById(id) {
    const data = await fetch(`/api/todo-item/${id}`).then(res => res.json());
    return new TodoItem(data.title, data.done, data.id);
  }
}

const todoItem = await TodoItem.getById(1)