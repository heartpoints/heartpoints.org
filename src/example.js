//To run this: after installing nodejs; from command line, in the project directory, run `node src/example.js`

const nums = [1,2,3,4,5]
const squares = nums.map(x => x * x);
const odds = nums.filter(x => x % 2 != 0);
const reducer = (a, b) => a + b;
const sum = nums.reduce(reducer, 0);

console.log({nums});
console.log({squares});
console.log({odds});
console.log({sum});