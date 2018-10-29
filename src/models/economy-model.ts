const people = ["EMT", "Tommy", "Mike"];
const range = (n:number):number[] => Array.apply(null, {length: n}).map(Number.call, Number)

interface Transaction {
    amount:number,
    timestep:number,
}

const numTimesteps = 3;

const transactions = (person:unknown, timestep:number):Transaction[] => [
    {
        amount: 1,
        timestep
    }
];

const sum = (transactions:Transaction[]):number => transactions.reduce((a,b) => a + b.amount, 0);

const balance = (person:unknown, t:number):number => {
    return t == 0
        ? 0
        : sum(transactions(person, t)) + balance(person, t - 1);
}
const timesteps = range(numTimesteps);
export const allStates = timesteps.map(
    timestep => ({
        timestep,
        people: people.map(p => ({
            name: p,
            balance: balance(p, timestep)
        }))
    })
);

// const printPerson = person => console.log(`${person}: ${timesteps.map(t => balance(person, t)).join(", ")}`);
// people.forEach(printPerson);