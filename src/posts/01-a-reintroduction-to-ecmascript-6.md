---
title: "A Reintroduction to ECMAScript 6"
date: "2021-04-18"
path: "/a-reintroduction-to-ecmascript-6"
coverImage: "../images/01-a-reintroduction-to-ecmascript-6.jpg"
author: "Harley Ferguson"
excerpt: "ES6 may be nearly 5 years old but I still see tons of code that isn't making use of the full ES6 awesomeness. Let's have a quick recap so we can start writing nicer code again."
tags: ["ecmascript6", "javascript"]
---

<sub><sup>Photo by Adam Solomon on Unsplash.</sup></sub>

ES6 may be nearly 5 years old but I still see tons of code that isn't making use of the full ES6 awesomeness. Let's have a quick reintroduction so we can start writing nicer code again.

ECMAScript 6 (or ES6 for short), is the sixth iteration in the JavaScript standardization. If you have no idea what I'm talking about, the TL;DR is that ES and all of it's versions aim to standize the way we write JavaScript by providing a scripting-language specification.

Now that you know what it is, let's start diving into the main differences between ES6 and it's previous version.

---

### `let` and `const` keywords

These are two new keywords that are probably going to fully replace your use of the `var` keyword.

Creating a variable with `const` means that it cannot be reassigned and is immuatble (except when it is used with objects but that's another blog post).

Trying to reassign the value of a `const` will actually throw an error.

```
const name = "Luke";
name = "Han";
console.log(name);
// --> Error: "name" is read-only
```

`let` creates mutable variables that can be reassigned.

```
let name = "Luke";
name = "Han";
console.log(name);
// --> Han
```

Both `let` and `const` make use of block scoping which we'll speak more about now.

---

### Block Scoping

A block scope generally refers to the area between two curly brackets. The introduction of `let` and `const` allow for us to write code that is only relevant within a certain block.

```
let name = "Harry";

if (name === "Harry") {
    let name = "Ron";
    console.log(name);
}
console.log(name);
// --> Ron
// --> Harry
```

We can see how block scoping allowed us to create a variable of the same name but it causes no issue as the second use of `name` is block scoped. Let's see what would happen if we tried this using `var` in ES5.

```
var name = "Harry";

if (name === "Harry") {
    var name = "Ron";
    console.log(name);
}
console.log(name);
// --> Ron
// --> Ron
```

Here, the declaration of the `name` variable inside the `if` statement actually just reassigns the original variable's value instead of creating a new one.

---

### Arrow Functions

Arrow functions are just new ways of writing functions that allow for shorter syntax and simpler anonymous functions. The biggest bonus is that they're just way more readable. Let's take a look:

```
// ES5
function greeter(name) {
    return "Hello " + name;
}

OR

greeter = function(name) {
    return "Hello " + name;
}

// ES6
greeter = name => {
    return "Hello " + name;
}
```

We can actually make this 1 line as arrow functions implicitly return if they're on a single line.

```
greeter = name => "Hello " + name;
```

An arrow function that takes in multiple (or no) parameters would make use of parenthesises.
```
greeter = (name, surname) => "Hello " + name + " " + surname + "."
```

Arrow functions have also made anonymous functions (like the ones used with `.map`, `.reduce` etc) much easier.

```
const hobbits = [
  'Frodo',
  'Sam',
  'Mary',
  'Pippin'
];

// ES5
console.log(hobbits.map(function(hobbit) {
    return hobbit.length
}));

// ES6
console.log(hobbits.map(hobbit => hobbit.length));
```

**Side note:** Arrow functions no longer need a binding to the `this` keyword. The reason for that is because regular functions require `this` to represent the object that called them. In arrow functions `this` represents the owner of the function.

---

### Template Literals

If you were paying attention, you would have noticed how I was returning the greeting in our `greeter` method. It looked like this:
```
greeter = (name, surname) => console.log("Hello " + name + " " + surname + ".")
greeter("John", "Cena");
// --> "Hello John Cena."
```

Template literals save us from writing `+` over and over again. Let's refactor our above code into something much cooler:

```
greeter = (name, surname) => console.log(`Hello ${name} ${surname}.`)
greeter("The", "Rock");
// --> "Hello The Rock."
```

---

### Default Parameters

Finally, right? I'm sure we are all aware of why this is awesome. Not having `undefined` thrown in our face because we forgot to guard against it is a lifesaver. 

```
// Without default parameter
greeter = (name, surname) => console.log(`Hello ${name} ${surname}.`)
greeter("Brad")
// --> "Hello Brad undefined
```

```
// With default parameter
greeter = (name = "John", surname = "Doe") => console.log(`Hello ${name} ${surname}.`)
greeter("Brad")
// --> "Hello Brad Doe"
```

---

### Array & Object Destructuring

This is a really simple and super effective trick. Destructuring basically allows for us unpack values from arrays and properties from objects into their own variables.

Previously we'd have to do this quite manually:

```
// ES5
const person = {
    name: "Marty",
    surname: "McFly",
    age: 18
}

var name = person.name;
var surname = person.surname;
var age = person.age;

console.log(name, surname, age);
// --> "Marty" "Mcfly" 18
```

Now let's do the same thing but with destructuring:
```
const person = {
    name: "Marty",
    surname: "McFly",
    age: 18
}

const {name, surname, age} = person;

console.log(name, surname, age);
// --> "Marty" "Mcfly" 18
```

Destructuring an array makes use of the rest operator and looks like this:
```
const hobbits = [
  'Frodo',
  'Sam',
  'Mary',
  'Pippin'
];

const [first, second, ...rest] = hobbits;
console.log(first);
console.log(second);
console.log(rest);
// --> "Frodo"
// --> "Sam"
// --> ["Mary", "Pippin"]
```

---

### Spread Operator

The spread operator has the same syntax as the rest operator but it takes the whole array/object itself instead of just the arguments.

```
numbers = [1, 2, 3];
sum = (a, b, c) => a + b + c;
total = sum(...numbers);
console.log(total);
// --> 6
```

The spread operator can also be use effectively when copying parts of objects.
```
originalPerson = {
  name: "Billy",
  surname: "Joel",
  age: 70
};

newPerson = {
  ...originalPerson,
  surname: "Eilish",
  age: 17
}

console.log(originalPerson);
// --> {name: "Billy", surname: "Joel", age: 70}
console.log(newPerson);
// --> {name: "Billy", surname: "Eilish", age: 17}
```

The spread will overwrite whatever properties are specifided but otherwise take all of the properties as they exist on the original object.

---

### Promises

If you're integrating with an API, promises are your best friend. They allow developers to write asynchronous code.

Promises are made up of a `resolve` and a `reject`. If we wrote our own to just return a subtle Star Wars quote, it'd look like this:
```
quote = () => {
    return new Promise((resolve, reject) => {
        resolve("Why hello there.")
    })
}
quote().then((res) => console.log(res));
```
What's happening here is we're calling the `quote()` method and then telling it what to do when the method resolves through the use of the `.then`. This means that our code can continue to do other things while we wait for the promise to resolve. An example of what an HTTP request looks like (since getting data from an API would need to be asynchronous) can be found below:
```
// Using the axios library to handle our API call
axios.get("https://my-json-server.typicode.com/askharley/nintendo-power-json-api/users/1")
    .then(result => console.log(result))
    .catch(error => console.log(error))
```

Here we can see if that if our call (which is a promise) resolves, we'll log the data through the `.then` callback and if it's rejected, we'll log the error through the `.catch` callback.

---

### Imports & Exports

This very simple concept allows for one of the greatest things there is in coding: seperation of concerns. We can now effectively create and separate components which allows for easier reusability.

```
// greeter.js
export default function greeter(name) {
    return `Hello ${name}.`
}

// home.js
import greeter from './greeter';

const greetings = greeter("Jack");
console.log(greetings);
// --> "Jack"
```

If a file exports multiple modules then we just throw them inside curvy brackets.

```
import {greeter, farewell} from './interactions';
```

---

### Classes

Last but not least, we have classes. Classes are the building block for object orietated programming and help encapsule our code. ES6 introduces all the normal bells and whistles that comes with classes such as instantiation, constructors, inheritance etc.

```
// Parent class
class Car { 
    constructor(name, colour) {
        this.name = name;
        this.colour = colour;        
    }
 
    startCar() {
        console.log(`Car: ${this.name} has started.`);
    }
}

// Child class
class Tesla extends Car {
    activateInsanityMode() {
        console.log("Activated Insanity mode.");
    }
}

const roadster = new Tesla("Roadster", "Red");
roadster.startCar();
roadster.activateInsanityMode();
```

---

That wraps up our introduction/reintroduction to the major changes that came with ES6. Hopefully you learnt a thing or two.
