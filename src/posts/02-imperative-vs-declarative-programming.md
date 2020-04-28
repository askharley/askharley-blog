---
title: "Imperative vs Declarative Programming"
date: "2020-04-28"
path: "/imperative-vs-declarative-programming"
coverImage: "../images/02-imperative-vs-declarative-programming.jpg"
author: "Harley Ferguson"
excerpt: "The term 'declarative programming' has regained popularity with the introduction of React. But what exactly is it and how does it compare to imperative programming?"
tags: ["programming paradigms"]
---

<sub><sup>Photo by Émile Perron on Unsplash.</sub></sup>

The term 'declarative programming' has regained popularity with the introduction of React. But what exactly is it and how does it compare to imperative programming?

Wikipedia defines imperative programming as:
>  A programming paradigm that uses statements that change a program's state. An imperative programing consists of commands for the computer to perform.

While declarative programming is defined as:
> A style of building the structure and elements of computer programs—that expresses the logic of a computation without describing its control flow.

Okay so what do these definitions actually mean and how are they different? Let's explore a simple analogy.

---

If I had a butler robot and I wanted it to make me a sandwich, imperatively I'd have to tell it this:

```
1. Go to the kitchen
2. Grab the bread, peanut butter and a butter knife
3. Remove 2 slices of bread
4. Use the knife to butter one slice of bread
5. Place the other slice on top of the buttered slice
6. Bring me the sandwich
```

To do the same thing declaratively would look like this:

```
Hey Mr Robot, I feel like a peanut butter sandwich.
```

Quite the difference, right? Imperatively means that we have to tell our butler robot (the program) every step it needs to do in order to complete the task. Doing the same thing means that we just declare our final state (having a sandwich) and we don't really care how it gets to that point.

This means that declarative programming is generally simpler to code because it's far more readable, doesn't require concerning yourself with lower level logic and allows use to define the solution and not each procedure.

---

Some examples using common languages:

#### SQL

SQL queries can also be declarative.

```
SELECT * FROM GAMES
```

Here we are just saying that we want all of the games in our database but we aren't instructing the computer on how it should be getting every game.

#### CSS

CSS is declarative programming. Our CSS classes are actually just defining how our elements should look while the browser takes care of the implemenation.

#### C Sharp

C# allows for developers to write both imperatively and declaratively.

```
var results = games.Where(game => game.Series == "God of War")
```

The above code is an example of how, using Linq, we can write declarative code. All we are asking for us a list of games that a part of the "God of War" series but we don't care how the program gives us that data. That's Linq's problem.

Achieving the same functionality imperatively would look like this:

```
List<Game> results = new List<Game>();
foreach(var game in games)
{
    if (game.Series == "God of War")
    {
        results.Add(game);
    }
}
```

---

Okay so why has "declarative" programming become more popular in recent years? Well that would be because of React.

React has heavily promoted itself as declarative. The reason for this is because alternative frameworks (like Angular) or libraries (like jQuery) are imperative. This may leave you wanting a code example but the difference between React and Angular is a blog post on it's own.

As we've seen, imperative programming can require the developer to be far more explicit and have to cater for more potential situations. Writing declarative code means that you have faith in your chosen tools and frameworks so that you don't have to write low level code.

Writing less code with regards to your UI rendering does come at a cost in React though. You're going to need to now understand state and how to manage it so that you can effectively render your UI.

Some people don't want to make the trade off so they'll stick with frameworks or styles that are imperative. I, on the other hand, love the concept of separating out our state into it's own portion of code that aids the UI to figure out how it needs to look without us explicitly having to tell it.

It's a greater seperation of concerns in my mind at least.

