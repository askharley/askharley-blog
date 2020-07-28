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

Good question in this day and age where every corner has a different version of state management.

The Recoil [docs](https://recoiljs.org/docs/introduction/motivation) themselves outline that React's built in state management is often more than enough, however, there are limitations.

1. Most state management frameworks require their to be a common ancestor (for mathematicians, a common denominator) where any state is then passed down to all of the lower leaves on the component tree. This is obviously ineffecient and can cause bloatage if one component is only one level lower than the common ancestor while another component is 4 levels lower. You'd have to pass that state into each component just to get it where you want it. This problem however is solved by most state management libraries but it's still something to be aware of.
2. The React Context API is built into React and solves the above problem. Great, we don't need to run `npm i some-state-management-library` right? Wrong. The Context API allows you to create global state, yes, but it does not allow you to store more than one value per context instance or have an indefinite number of values in a single context. So the Context API is great for storing if the user is using a dark or light theme but not if you're working with a list of data that could have the length of 0 to n.
3. Either approach (using React's build in functionality or bringing in another library like Redux) still results in your state having to live very high in your component tree when the component that actually needs the state could be very low. This is a problem because a re-render can become expensive as every component from the top of the tree where the state is defined down to the using component will be re-rendered.

Recoil allows you to create a provider/consumer approach to state management where consumers directly subscribe to a provider's values and re-renders will only occur when the value of a provider changes. This means that we aren't causing unmounts and remounts of our components tree every time we change state. Only the components that subscribe to a specific piece of state will be updated when the value changes.

### How is Recoil different from Redux?

Redux follows the [Flux](https://facebook.github.io/flux/) architecture which makes use of actions, dispatches, reducers and stores. Data flows from actions, into a dispatcher where a reducer makes sense of what needs to be done before persisting anything to the store.

Recoil is a little simpler. It only has two components: atoms and selectors. Data flows from atoms through selectors and finally to our components.

### What are atoms and selectors?

Atoms are units of states. The purpose of the atom is to house our stateful data and allow us to update and subscribe to them. What this means is that whenever an atom is updated to a new value, the components that are subscribed will re-render and be provided with the updated data. You could begin to see how atoms could begin to replace the use the `useState()` hook that passes down the same data to multiple children from the parents (this is also known as prop drilling).

Selectors are pure functions (a function that has the same return value provided the same input and has no side effects) which either accept atoms or either selectors. Selectors can help us to calculate derived or manipulated data (thusly mitigating the need for a reducer).

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

If we need to read and write an atom from a component, we can make use of the `useRecoilState` hook. It's incredibly similar to the `useState` hook.

```js
function Counter() {
    const [count, setCount] = useRecoilState(countState);

    return (
        <h2>{count}</h2>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
    );
}
```

Other components would now also be able to access the current value the `countState` atom and would receive updates and re-renders whenever they happened.

### How do selectors work?

Selectors are pieces of derived state. If that term is unfamiliar to you, derived state is essentially the resulting output of passing state to a pure function that will then modify the given state in some way (think of how a reducer works in Redux). An example of a derived state would be if you conducted a query to filter an array of data. Let's explore that a little further:

```js
const filteredUsersListState = selector({
    key: 'filteredUsersListState',
    get: ({get}) => {
        const filter = get(currentFilterState);
        const list = get(currentUserListState);

        switch (filter) {
            case: 'Admin':
                return list.filter((user) => user.isAdmin)
            case: 'Other':
                return list.filter((user) => !user.isAdmin)
            default:
                return list;
        }
    }
})
```

We can see from the above example that we now have a selector which makes use of two other atoms (`currentFilterState` and `currentUserListState`). Any time either of those atoms are updated, this selector will then rerun and output the new filtered list. This is because the selector internally keeps track of those pieces of state.

**Some things to note:**

1. Selectors can also return multiple values which makes the potential heavy lifting they could do unfathomable.
2. Simpler applications don't have to make use of selectors if there is no need to have derived state. You could just have atoms and make use of the `useRecoilState` hook.

### What are the common hooks I'd use in Recoil?

- `useRecoilValue` - returns the value for a Recoil state value
- `useSetRecoilState` - returns just a setting function for a Recoil state value
- `useRecoilState` - returns a tuple that mimicks what the `useState` hook does. The first element is the value and the second element is a setter function for that value.

These are the main 3 hooks that I'd guess would be used most commonly. You can explore the other core hooks [here](https://recoiljs.org/docs/api-reference/core/isRecoilValue).

---

Recoil doesn't aim to be the only state management tool you use in your apps. React's built in state hooks as well as the Context API will solve a lot of your problems, however, Recoil will help you to solve the rest of the scenarios without comprising the performance of your application.

That wraps up our basic introduction to what Recoil is. In our next post, we're going to be recreating [ShopDrop](https://askharley-blog.netlify.app/build-a-react-redux-shopping-list-app) which we initially built using Redux. If you're familiar with Redux, give that blog post a read so you'll better understand the comparisons between Redux and Recoil's approach to state management.