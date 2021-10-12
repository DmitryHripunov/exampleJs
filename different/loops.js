const names = ['Jastin', 'Burke', 'Sarah'];

console.log('--- while loop ---');
let whileIndex = 0;
while (whileIndex < names.length) {
  const name = names[whileIndex];
  console.log(name);
  whileIndex++
};

console.log('--- for loop ---');
for (let forIndex = 0; forIndex < names.length; forIndex++) {
  const name = names[forIndex];
  console.log(name);
};

console.log('--- for of loop ---');

for (isName of names) {
  console.log(isName);
}