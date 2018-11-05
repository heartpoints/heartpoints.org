

// interface Person {
    //     firstName:string,
    //     age:number
    // }
    
console.log('program started');
const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));
sleep(2000).then(() => console.log("sleep completed"));

// sleep(2000).then(() => {
//     console.log('2 seconds');
//     return sleep(3000).then(() => console.log('additional 3 seconds'))
// }).then(() => console.log("myes"));

function doSomethingThatMightThrowError(val):Promise<number> {
    return sleep(1000).then(() => val + 2);
    // throw new Error(`error for val ${val}`);
    // return val + 2;
}

//async / await

async function doSomethingThatFromOutsideLooksAsync():Promise {
    return 8;
}

type AllowedTabName = "tab1" | "tab2" | "tab3"

interface MyComponentProps {
    title:string,
    subTitle?:string,
    tabName:AllowedTabName
}

// class MyComponent extends React.Component<MyComponentProps, void> {
//     render() {
//         return <div>

//         </div>
//     }
// }

//pure component
const MyComponent = (props:MyComponentProps) => <div>
    <p>Hello, ${}
</div>

async function doTheThing():Promise<number> {
    try {
        await sleep(2000);
        console.log("first 2 seconds");
        await sleep(2000);
        const result = await doSomethingThatMightThrowError(await doSomethingThatMightThrowError(5));
        const square = result * result;
        console.log(`val is ${square}`);
    }
    catch(e) {
        console.log(`An error occurred!, ${e}`);
    }
    const shouldDoAsyncThing = 5;
    const r = shouldDoAsyncThing 
        ? await doSomethingThatMightThrowError(5) 
        : 12;

    // sleep(2000)
    //     .then(() => console.log("first 2 seconds"))
    //     .then(() => sleep(2000).then(() => 5))
    //     .then(val => doSomethingThatMightThrowError(val))
    //     .then(val => val * val)
    //     .then(val => console.log(`val is ${val}`))
    //     .catch(e => console.log(`An error occurred!, ${e}`));
}




// ///

// async function doSomethingAsync(url:string):Promise<Person> {
//     return sleep(2000).then(() => ({ firstName: "Tommy", age: 38}));
// }

// function onPersonLoaded(person:Person):void {
    // console.log(`person: ${JSON.stringify(person, null, 3)}`);
// }

// doSomethingAsync("http://person").then(onPersonLoaded);

// const names = ['tommy', 'jamie','mike']
// console.log(names);
// console.log(names.map(x => `name is ${x}`));
// console.log(names.map(function(n) {
//     return `name is ${n}`
// }));