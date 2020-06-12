---
title: "What is Redux exactly?"
date: "2020-05-20"
path: "/what-is-redux-exactly"
coverImage: "../images/04-what-is-redux-exactly.jpg"
author: "Harley Ferguson"
excerpt: "If you're a React youngling, you would have heard the term 'redux' flung around everywhere. Let's explore what it is, why you need it and how to implement it into your application."
tags: ["redux", "react", "state-management"]
---

<sub><sup>Photo by Austin Chan on Unsplash.</sup></sub>

You've seen Redux mentioned in nearly every "Getting Started with React" article you've read. Terms like actions, reducers and store keep cluttering your understanding. Let's break down what Redux is from a top-down approach and then look at some code.

---

### Redux, State Management and State

Redux is a predictable state container. What does that mean? It means that Redux provides tools for you to help manage state within your applications in a predictable way. Redux makes this process "predictable" by defining a pattern you must follow to make changes to your state. This pattern follows an immutable approach.

State management is a way of allowing us as developers to add, remove, update and access state in our applications.

State is the current representation of all the actions the user has performed. Clicking a button to get a list of data from an API is state. Tracking if the user is typing with a variable called `isTyping` is state. Filling in information on a form is state.

### Global and Local State

These are terms you'll see often and a part of what Redux solves.

Local state is local to a given component. Like with our previously mentioned `isTyping` variable. That variable is only relevant to the component that is making use of it or even just the input field that is making use of it.

Say we fetch a user's profile details from an API. What if we need to show the user's name on the `DashboardComponent.js` and then on a `ProfileComponent.js`? Would you make two API calls to the same endpoint to get the same data or would you rather make a single call, store that data somewhere and allow both components to have access to that data? This data would then be regarded as being global state because the entire application can access it. This is the type of situation that Redux helps solve.

### Is Redux the only solution?

Hell no. Redux is one of the oldest and most popular forms of state management in React but it is by no means the only approach. Libraries like [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) and [recoil](https://recoiljs.org/) provide you with alternative ways of managing state. Also, Redux is just a pattern with corresponding npm libraries. You could take this pattern and implement it on your own or in other technologies/stacks/languages like what they've done in [Flutter](https://pub.dev/packages/flutter_redux).

### How does Redux work?

Redux was created by Dan Abramov and Andrew Clark in 2015. They decided to build off of [Flux](https://facebook.github.io/flux/) and implement some of it's key concepts like a unidirectional data flow pattern.

Flux and Redux's data flow looks like this:

![flux-data-flow](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-1300w.png)

### Actions

Actions are payloads of information that are dispatched to the store. Dispatching an action is the only way to manipulate the store.

```js
// example action
{
    type: 'ADD_ITEM',
    payload: {        
        value: 'Chocolate' 
    }
}
```

Actions follow the general model of a [FSA (Flux Standard Action)](https://github.com/redux-utilities/flux-standard-action) which is a human-friendly model that allows us to more easily reason with actions.

**Note:** It's suggested that the `type` is a `string` constant and if your app's scale is increasing, then you move those constants into their own module. This avoids using string literals and potentially having a typo between the `type` value in your action and then `type` value we'll perform a switch on in our reducer. For this demonstration, we'll just use a string literal for simplicty's sake.


### Action Creators

We create action objects by defining an action creator. Action creators are functions that we call to create an action for us.

```js
// example action creator
const actionCreators = {
    newItem: (data) => { type: 'ADD_ITEM', payload: data }
}
```

This provides us with an object that has a function property called `newItem`. If we provide that object with a `data` value of say "Chocolate", it'll produce an action like the one we saw in initial example of an action object.

### Dispatcher

The dispatcher's job is to simply dispatch actions. The reducer will listen out for any dispatched actions and then act accordingly.

Before the React Hooks era, you could make use of `store.dispatch()` to dispatch your actions for you.

With React Hooks, you can write an implementation like this:

```js
import { dispatch } from 'react-redux';

const dispatch = useDispatch();
```
Then just wrap any action or action creator method in `dispatch()`.

### Reducers

Reducers are functions that specify how are state must change in response to each action. Action objects are only telling us which action happened and provide any relevant data. It's the reducer's job to actually build the new state.

To build off of our current example:

```js
const initialState = {
    items: []
}

function itemReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case default:
            return state;
    }
}
```

1. We've created our `initialState` object that just has a property of `items` which is an empty array to begin with.
2. We've defined a reducer that takes in two arguments, `state` and `action`.
3. The `state` represents the current state and is provided an initial value thanks to our `initialState` variable.
4. `action` is the action that has just been dispatched to the reducer.
5. We perform a standard switch case on the `action.type` to see if it's match.
6. Making use of spread operator in ES6 (check [this](https://askharley-blog.netlify.app/a-reintroduction-to-ecmascript-6) out if you're unfamiliar with ES6 awesomeness), we return a new state object that has the payload value from the `action` appending to our list array.

---

That's pretty much it for describing and setting up the unidirectional data flow in your application.

Our next post will look at implementing Redux into your React application a little bit more indepth. We'll build an app called "ShopDrop" that allows for users to add items to their shopping list, mark them as in their basket, remove an item from their list or clear the whole list.

This should give you some more insight into Redux's role in a full scale React app.