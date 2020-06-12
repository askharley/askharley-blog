---
title: "JavaScript's const keyword"
date: "2020-05-07"
path: "/javascripts-const-keyword"
coverImage: "../images/03-javascripts-const-keyword.jpg"
author: "Harley Ferguson"
excerpt: "JavaScript's introduction of the const keyword in ES6 is amazing but has some hidden passages that you may not be aware of."
tags: ["ecmascript6", "javascript"]
---

<sub><sup>Photo by Bernard Hermant on Unsplash. It's planks of wood. Because of Planck's constant. Get it. Not a physics fans, huh? </sub></sup>

JavaScript's introduction of the const keyword in ES6 is amazing but has some hidden passages that you may not be aware of.

### The `const` keyword

`const` is used to create block-scoped variables that provide a read-only reference to a value.

```js
const name = "John";
name = "Ringo"; 
console.log(name); // John
```

We can see here how we've declared a constant variable called `name` with the value of "John". If we try to reassign that value to "Ringo", the application will throw an error and inform us that the `name` variable is read-only.

### `const` and Objects

Like mentioned above, the `const` keyword will create a read-only variable, however, that does not mean that the actual variable reference is immutable.

```js
const beatle = {
    name: "John",
    surname: "Lennon"
}

beatle.name = "Ringo";
console.log(beatle.name); // Ringo
```

We were able to reassign the property on the constant because we haven't attempted to change the variable's reference but rather the value on a property in that reference. `const` only allows us to not reassign the reference.


### `const` and Arrays

```js
const beatles = ['John', 'Paul', 'George'];
beatles.push('Ringo');
console.log(beatles); // ["John", "Paul", "George", "Ringo"]

beatles.pop();
beatles.pop();
console.log(beatles); // ["John", "Paul"]

beatles = ["Noel", "Liam"]; // TypeError
```

Once again we can see how we can manipulate a `const` variable array by adding and remove elements, however, as soon as we attempt to reassign the variable to a new array an error is thrown.

### Constants and Enums

So if we have a `const` keyword that doesn't allow reassignment to a new reference but still allows you to reassign a property, how could we make that not possible at all for the use case of constants or enumerators?

The answer to that is `Object.freeze()`. This method will "freeze" an object which means that the object can no longer be changed, properties cannot be added and properties cannot be removed. It even prevents the prototype being changed.

```js
const beatle = Object.freeze({
    name: "John",
    surname: "Lennon"
});

beatle.name = "Ringo";
console.log(beatle.name); // John
```

`Object.freeze()` allows us to create constants and enums with the guarantee that the values won't be changed in anyway.

**Note:** Nested objects within a frozen objects need to be frozen as well. Freezing an object only freezes the parent object.

### When to use `const`

`const` should be used when you're wanting to create a block-scoped variable where you know that the value isn't going to change.

```js
// INCORRECT
const beatles = ['John', 'Paul', 'George', 'Ringo'];

for (const i = 0; i < beatles.length; i++) { // TypeError as you're reassigning i
    console.log(beatles[i]);
}

// CORRECT
const beatles = ['John', 'Paul', 'George', 'Ringo'];

for (const member of beatles) {
    console.log(member);
}
```
