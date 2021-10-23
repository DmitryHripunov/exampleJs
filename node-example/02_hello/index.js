const generateId = require('./id');
const ms = require('ms');
require('dotenv').config();

// console.log('new id:', generateId());
console.log(`New task id is ${generateId()}, its duration ${ms('5m')}ms `)

console.log(process.env.NODE_ENV);
console.log(process.env.BD_HOST, process.env.BD_USER, process.env.BD_PASS);
