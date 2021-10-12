//экземпляр класса instance
class Student {
  constructor (name, surname, educationStartDate) {
    this.name = name;
    this.surname = surname;
    this.educationStartDate = educationStartDate || new Date();
  }
}

const students = [
  new Student('Тимофей', 'Тиунов'),
  new Student('Тимофей2', 'Тиунов2', new Date(2016, 8, 1)),
]

class TodoItem {
  done = false;
  createdAt = new Date();

  constructor(title = 'новое дело') {
    this.title = title;
  }
}

const todoItem = new TodoItem('Купить...')
todoItem.done = true;
