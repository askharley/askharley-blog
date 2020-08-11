---
title: "What is Recoil exactly?"
date: "2020-07-27"
path: "/what-is-recoil-exactly"
coverImage: "../images/07-what-is-recoil-exactly.jpg"
author: "Harley Ferguson"
excerpt: "We've explain what state management is, how Redux fits into it as well as how to write super clean Redux code. Now let's look at Facebook Experimental's latest state management library: Recoil."
tags: ["react", "recoil", "state-management"]
---

<sub><sup>Photo by Ali Yilmaz on Unsplash.</sup></sub>

Recoil is new. Like, super new. As in it in version 0.0.10 and it's earliest commit on the public repo is from early May of this year.

Just because it's so new and is listed as "experimental" doesn't mean that we can't look into it and understand why it is so useful.

---

### Why should I use Recoil in the first place?

Good question in this day and age where every corner has a different library that can be used for state management.

The Recoil [docs](https://recoiljs.org/docs/introduction/motivation) themselves outline that React's built in state management is often more than enough, however, there are limitations.

1. Most state management frameworks require there to be a common ancestor (for mathematicians, a common denominator) where any state is then passed down to all of the lower leaves on the component tree. This is obviously ineffecient and can cause bloatage if one component is only one level lower than the common ancestor while another component is 4 levels lower. You'd have to pass that state into each component just to get it where you want it. This problem however is solved by most state management libraries but it's still something to be aware of.
2. The React Context API is built into React and solves the above problem. Great, we don't need to run `npm i some-state-management-library` right? Wrong. The Context API allows you to create global state, yes, but it does not allow you to store more than one value per context instance or have an indefinite number of values in a single context. So the Context API is great for storing if the user is using a dark or light theme but not if you're working with a list of data that could have the length of 0 to n. On top of this, it's been suggested to not use the Context API for complex data structures or state that is frequently updated.
3. Either approach (using React's built in functionality or bringing in another library like Redux) still results in your state having to live very high in your component tree when the component that actually needs the state could be very low down. This is a problem because a re-render can become expensive as every component from the top of the tree where the state is defined down to the using component will be re-rendered.

Recoil allows you to create a provider/consumer approach to state management where consumers directly subscribe to a provider's values and re-renders will only occur when the value of a provider changes. This means that we aren't causing unmounts and remounts of our components tree every time we change state. Only the components that subscribe to a specific piece of state will be updated when the value changes.

Beyond Recoil helping solve the 3 problems we outlined above, Recoil provides a very easy-to-use API that follows a similar approach to that of hooks like `useState()`. This makes reasoning about global state nearly identical as how we reason about local component state. This is obviously a big win for our human minds but also has the added benefit of not having to go and learn the Flux architecture and write all of the boilerplate code that comes with Redux.

### How is Recoil different from Redux?

Redux follows the [Flux](https://facebook.github.io/flux/) architecture which makes use of actions, dispatches, reducers and stores. Data flows from actions, into a dispatcher where a reducer makes sense of what needs to be done before persisting anything to the store.

Recoil is a little simpler. It only has two components: atoms and selectors. Data flows from atoms through selectors and finally to our components.

### What are atoms and selectors?

Atoms are units of states. The purpose of the atom is to house our stateful data and allow us to update and subscribe to that data. What this means is that whenever an atom is updated to a new value, the components that are subscribed will re-render and be provided with the updated data. You could begin to see how atoms could replace the use of the `useState()` hook passing down the same data to multiple children from the parents (this is also known as prop drilling).

Selectors are pure functions (a function that has the same return value provided the same input and has no side effects) which either accept atoms or selectors. Selectors can help us to calculate derived or manipulated data (thusly mitigating the need for a reducer).

---

### How do atoms work?

To declare an atom, we'll need to make use of the `atom` function from the [recoil](https://www.npmjs.com/package/recoil) library.

```js
const countState = atom({
    key: 'countState',
    default: 0
});
```

You can see here that an atom requires a unique key (generally just the variable name). This key must be globally unique. Atoms also need to be provided a default value.

If we need to read and write an atom from a component, we can make use of the `useRecoilState` hook. It's incredibly similar to the `useState` hook in that it provides us with the value itself and a method to set that value.

```js
function Counter() {
    const [count, setCount] = useRecoilState(countState);

    return (
        <h2>{count}</h2>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
    );
}
```

Other components would now also be able to access the current value of the `countState` atom and would receive updates and re-renders whenever they happened, regardless of what component updated the value.

### How do selectors work?

Selectors are pieces of derived state. If that term is unfamiliar to you, derived state is essentially the resulting output of passing state to a pure function that will then modify the given state in some way (think of how a reducer works in Redux) and output that result without changing the value of the initial state. For our example, let's explore a situation where we needed to know if the the current count was even or odd:

```js
export const isEvenState = selector({
	key: "isEvenState",
  	get: ({ get }) => {
    	const count = get(countState);
        return 0 === count % 2;
    }
)}
```

We can see from the above example that we now have a selector which makes use of the `countState` atom. Whenever the `countState` atom is updated, this selector will rerun and output the result of it's own logic.

Selectors don't only accept atoms but can also accept other selectors. This means you could develop quite a functional approach to your state management by breaking down derived state into small selectors that accept each other instead of potentially building a Frankenstein's Monster of a selector when you're dealing with a complex piece of derived state.

**Some things to note:**

1. Selectors can also return multiple values which makes the potential heavy lifting they could do unfathomable.
2. Simpler applications don't have to make use of selectors if there is no need to have derived state. Don't feel obligated to make a selector for the sake of having one.

### What are the common hooks I'd use in Recoil?

- `useRecoilValue` - returns the value for a Recoil state value
- `useSetRecoilState` - returns just a setter function for a Recoil atom
- `useRecoilState` - returns a tuple that mimicks what the `useState` hook does. The first element is the value and the second element is a setter function for that value.

These are the hooks I would consider the most commonly needed. You can explore the other core hooks [here](https://recoiljs.org/docs/api-reference/core/isRecoilValue).

---

Recoil doesn't aim to be the only state management tool you use in your apps. React's built in state hooks as well as the Context API will solve a lot of your problems, however, Recoil will help you to solve the rest of the scenarios without compromising the performance of your application.

If you're wanting to see Recoil in action on a slightly more complex scenario, check out [this](https://github.com/haefele-software/react-recoil-workshop) repo. This repo explores a simple application where users can add teams and add players to those teams. There is an example of how to achieve this using Redux, an example of how to achieve this using Recoil and an empty project with no state management implemented so that you can mess around.