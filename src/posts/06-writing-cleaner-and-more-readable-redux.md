---
title: "Writing Cleaner & More Readable Redux"
date: "2020-06-04"
path: "/writing-cleaner-and-more-readable-redux"
coverImage: "../images/06-writing-cleaner-and-more-readable-redux.jpg"
author: "Harley Ferguson"
excerpt: "Building off of the shopping list app we built in the previous blog post, let's see how we can write cleaner and more readable Redux code."
tags: ["redux", "react", "demo"]
---

<sub><sup>Photo by Amanda Jones on Unsplash.</sub></sup>

Writing Redux code can quickly become boilerplately and difficult to understand. This aplies especially on larger projects or when you're needing to update an incredibly nested property.

We can make use of two libraries to very easily adjust your approach while making your code much cleaner and far more readable.

---

The libraries [redux-actions](https://redux-actions.js.org/api) and [@reactjs/toolkit](https://redux-toolkit.js.org/) are fantastic and can help us to write a lot less Redux code without losing functionality.

`redux-actions` allows us to rapidly produce generic action creators (as well as create action creators that manipulate the data before returning the action object) while `reduxjs/toolkit` allows for us to structure our reducers in a different way plus make us of [immer](https://immerjs.github.io/immer/docs/introduction). Immer is a library that allows us to write code in a mutable fashion by making use of a proxy state, however, the updates to our store are actually performed immutably.

![immer-flow](https://immerjs.github.io/immer/img/immer.png)

This describes the flow of immer. You're provided with a draft (or proxy) state that represents the current one. You can then make changes to that draft state. After you're done making changes, that draft state will be persisted to the store as the next state.

---

### Actions

Let's look at our `actions.js` file from the ShopDrop application we created in the previous blog.

Our actions currently look like this:

```js
export const actionCreators = {
  addToList: data => ({ type: "ADD_TO_LIST", payload: data }),
  addToBasket: data => ({ type: "ADD_TO_BASKET", payload: data }),
  removeItem: data => ({ type: "REMOVE_ITEM", payload: data }),
  clearItems: () => ({ type: "CLEAR_ITEMS" })
};
```

If we import the `redux-actions` library into our project using `npm i redux-actions`, we'll then be able to import the `createActions` function. Using that function, we can rapidly produce action creators that would be identical to the example you see above.

```js
import { createActions } from "redux-actions";

export const actionCreators = createActions(
  {},
  "ADD_TO_LIST",
  "ADD_TO_BASKET",
  "REMOVE_ITEM",
  "CLEAR_ITEMS"
);

```

All we need to provide this method is the type of the action (like we normally would) and it'll implicitly build a function that would take data and return that as a payload. The result of the above could would provide is with an `actionCreators` object that if we were to log, would look like this:

```js
Object {
  addToList: function actionCreator() {}
  addToBasket: function actionCreator() {}
  removeItem: function actionCreator() {}
  clearItems: function actionCreator() {}
}
```

A function is generated in the form of camel case based on what string literal type we provided to the method.

**Note:** Check out the [API](https://redux-actions.js.org/api/createaction) to see how you could perform data manipulation prior to creating the action object.

--- 

### Reducer

Our previous `reducer.js` would have looked like this:

```js
const initialState = {
  items: []
};

const addItemToBasket = (array, action) => {
  return array.map((item, index) => {
    if (index !== action.payload) {
      return item;
    }

    return {
      ...item,
      inBasket: true
    };
  });
};

const removeItemFromList = (array, action) => {
  return array.filter((item, index) => index !== action.payload);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_LIST":
      return {
        ...state,
        items: [
          ...state.items,
          {
            value: action.payload,
            inBasket: false
          }
        ]
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        items: addItemToBasket(state.items, action)
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: removeItemFromList(state.items, action)
      };
    case "CLEAR_ITEMS": {
      return {
        items: []
      };
    }
    default:
      return state;
  }
};
```

After importing the new library using `npm i reduxjs/toolkit`, we could make use of the `createReducer` function. This function allows us to build a reducer without having to have a switch cache (and thusly mitigating the need for string constants for action types everywhere). The biggest bonus is that this library is a wrapper for immer which means it allows us to make changes mutably.

Our new reducer could look something like this:

```js
import { createReducer } from "@reduxjs/toolkit";
import { actionCreators } from "./actions";

const initialState = {
  items: []
};

export default createReducer(initialState, {
  [actionCreators.addToList]: (state, action) => {
    state.items.push({
      id: state.items.length,
      value: action.payload,
      inBasket: false
    });
  },
  [actionCreators.addToBasket]: (state, action) => {
    state.items[action.payload].inBasket = true;
  },
  [actionCreators.removeItem]: (state, action) => {
    state.items = state.items.filter((item, index) => index !== action.payload);
  },
  [actionCreators.clearItems]: (state, action) => {
    state.items = [];
  }
});
```

You can see how much easier this makes updating nested properties and also how much easier it is to read. We could go from this:

```js
return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
```

to this:

```js
return {
  state.first.second[action.someId].fourth = action.someValue;
}
```
---

As usual a CodeSandBox for this project is available [here](https://codesandbox.io/s/shop-drop-clean-redux-xd6cu) if you want to mess around and dive into the code.