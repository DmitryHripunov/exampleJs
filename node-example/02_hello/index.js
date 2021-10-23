const generateId = require('./id');
const ms = require('ms');

// console.log('new id:', generateId());
console.log(`New task id is ${generateId()}, its duration ${ms('5m')}ms `)