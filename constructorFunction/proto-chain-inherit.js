function Human(name, surname, birthDate) {
  // Object.setPrototypeOf(this, Human.prototype)
  this.name = name;
  this.surname = surname;
  this.birthDate = birthDate;
}

Object.assign(Human.prototype, {
  getFullName() {
    return `${this.name} ${this.surname}`
  },
  printBirthDate() {
    console.log(this.birthDate);
  }
});

function Student(name, surname, birthDate, grade) {
  // super(name, surname, birthDate)
  // Object.setPrototypeOf(this, Student.prototype)
  Human.call(this, name, surname, birthDate)
  this.grade = grade;
}

Object.assign(Student.prototype, {
  getRemainingGrads() {
    return 4 - this.grade;
  },
});

// наследование extends
Object.setPrototypeOf(Student.prototype, Human.prototype)