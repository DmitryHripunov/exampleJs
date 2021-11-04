const target = {
  name: 'sads' // enumerable: true, writable: true,configurable: true
};

Object.defineProperties(target, 'name', {
  value = 'AVC',
  // get() {},
  // set() {},
  enumerable: false, //включить ключи Object.keys(target)
  writable: false, //переиспользовать методы target.name = 'asd'
  configurable: false, // изменить настройки enumerable, writable
});

//---getPrototypeOf-----//
const obj = new Array();
Object.getPrototypeOf(obj);
Object.isPrototypeOf(obj);
obj instanceof Array;

//-----setPrototypeOf----//
const me = {
  name: 'sad',
  surname: 'saddd'
}

const methods = {
  getFullName() {
    return `${this.name} ${this.surname}`
  }
}

Object.setPrototypeOf(me, methods);

//-----create----//
const me = Object.create({
  getFullName() {
    return `${this.name} ${this.surname}`
  }
}, {
  value: 'sad',
  enumerable: true,
  writable: false,
  configurable: false,
})

//-----constructor---//
const arr = new Array();
console.log(err.constructor);

const arr1 = new arr.constructor()