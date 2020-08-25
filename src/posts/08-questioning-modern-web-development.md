---
title: "Questioning Modern Web Development"
date: "2020-08-25"
path: "/questioning-modern-web-development"
coverImage: "../images/08-questioning-modern-web-development.jpg"
author: "Harley Ferguson"
excerpt: "I personally have a lot of questions about modern web development. Why do we have so many JavaScript framesworks? Where is the web going to be 10 years from now? This article doesn't serve to answer these questions but rather explore and dive deeper into the abyss.."
tags: ["web development"]
---

<sub><sup>Photo by Markus Spiske on Unsplash.</sup></sub>

I personally have a lot of questions about modern web development. Why do we have so many JavaScript framesworks? Where is the web going to be 10 years from now? This article doesn't serve to answer these questions but rather explore and dive deeper into the abyss.

---

### Why is JavaScript so popular?

Don't get me wrong, JavaScript is personally my favourite language to write code in but I need to remain object here. Why has this one language taken the world by storm? 

The answer is most likely because JavaScript as a langauge become so much better in comparison to how it used to be. Initially, a lot of tools and technologies were created to make up for JavaScript's shortcomings but now, like a fine wine, JavaScript has matured. This would have promoted more efforts into working with, exploring and expanding one's knowledge of JavaScript.

Then, we can't ignore that JavaScript is the only language that every browser supports. Let's add the fact that JavaScript can be rendered on client or server side. To the experienced developer, those are reasons enough to use this language but what about new developers?

New developers are far less likely to think of rendering or browser support so why would this language appeal to them? My guess would be because JavaScript is somewhat simple to pick up, easily accessible and allows for pretty much instant gratification with the code you write being executed in your browser. Then what about developers who are wanting to explore concepts or programming paradigms? Object orientated vs functional? Imperative vs declarative?

JavaScript is a minimalistic languages and does not tie you into anything. Languages like C# expect you to go ahead and write object orientated code. Languages like Scala are begging for pure functions and no side effects. JavaScript is agnostic (borderline athiest) and allows you to write the code in whatever convention, approach, paradigm or style you wish. This is a big draw for developers who are starting to expand their knowledge.

All of these factors resulted in millions of developers picking up the language and making it the popular girl at the dance.

### Why are there so many JavaScript frameworks?

Long gone are the days of some PHP/Rails/whatever to generate your HTML with some jQuery thrown in the mix. Now we have a plethora of JavaScript libraryies to choose from. React, Angular, Vue, Knockout, and the list goes on. Every corner has a new framework (or library with it's own ecosystem, such as React) claiming to solve some problems better than other frameworks. Why do we have a saturated market?

It's pretty simple actually and can be simply explained by the infamous, The Notorious B.I.G: Mo Money Mo Problems. To translate this for those who aren't educated on the late 90's rap scene, the increase in JavaScript's popularity meant that more people were using it which would result in more opinions/arguments about how to achieve certain things.

For example, Google wants to build the web applications one way. Facebook wants to build their web applications another way. Google creates Angular. Facebook creates React. Both frameworks achieve the same thing. Both frameworks use the same language. Both frameworks have a legion of developers who have sworn allegiance. Both do some things better or worse than the other. Then Vue comes along and claims to be more progressive than it's competitors and, thusly, the market continues to grow with more options.

I'm all for competition. Competition is what pushes us forward as a species but the great JavaScript Framework for of the 2010s has taken it too far and doesn't seem to be slowing down. We are no longer looking for JavaScript developers in our hiring process. We're looking for a developer with 2 years React experience coupled with Redux, a developer with 3 years Angular 2+ experience that knows NgRx. This is too much.

Not only does every framework have it's own design and architectural patterns but libraries and concepts are now being coupled with that framework. Angular developers are most likely not going to understand the Flux architecture that Redux follows and React developers aren't going to understand Angular's approach resolvers. Each framework is going deeper and deeper down it's own path and as time passes, the similarities between them begin to thin.

I understand that certain minds will prefer to code in a certain framework. I, for one, am the biggest React fan boy out there. That's probably because I prefer functional code and React encourages writing functional JavaScript. However, the amount of tools, patterns and concepts that I have to learn that only hold water in a React ecosystem is ridiculous.

I don't know what the answer is. Maybe it's a completely open source (not owned by a [FAANG](https://en.wikipedia.org/wiki/Big_Tech#FAANG) company) framework? Maybe it's a framework that allows you to write code either in an object-orientated or a functional fashion? Maybe it's time we just give in and leave the title of "Frontend Developer" behind and take the helm of "React Developer". Directly coupling our career and livelihood to the survival of something that is completely outside of our control.

### How do we go about bundle splitting?

As any application grows, so does it's bundle. If you're unfamiliar with how SPA (single paged applications) work, your browser downloads the whole application the first time you visit the website. This is an issue because if a user is only accessing the FAQ of your site, they've still gone and downloaded every other page that your site has to offer.

Bundle splitting helps solve this by breaking your code into multiple bundles that can be lazy loaded. In this way, only your FAQ page would be downloaded to the user's browser until the user requests a different page. First problem solved.

The next problem is that you're going to make changes and update your web application. This means that the bundle has changed and potentially the index file that was tracking the lazy loading of your modules has also been changed. This means that users with an outdated bundle will be viewing an outdated version of your website.

In my opinion, the best solution to do is create a system that alerts the user that their version of the site is out of date. [react-hook-form](https://react-hook-form.com/) does this quite nicely by presenting the user with an alert, informing them to update to the latest version.

![react-hook-form-alert](https://i.ibb.co/WDQ7KbJ/react-hook-form-2.png)

Even if this process is done tastefully, it's still a very offputting experience to the average user and is something we need to figure out a better approach to.

### Is Server-Side Rendering the future?

Client side rendering looks something like that: the user navigates to a page which will initially be blank. That page will then be filled with React/Angular/Vue and JavaScript along with any data that was fetched from an API. This isn't exactly the best idea because regardless of how fast a client's machine is, the page is blank at some point.

Server-side rendering allows us to run JavaScript frontend code on the backend, which will then fill out the page with HTML. The user loads that page, which has some pre-rendered content and then the JavaScript loads which will make the page interactive. Better, right? There isn't an initially blank page so this must be better. Not exactly.

Using server-side rendering means that your initial render actually provides the user with a dead page. You've now gone and created a [Time To Interactive](https://web.dev/interactive/) metric which [Lighthouse](https://developers.google.com/web/tools/lighthouse) will deduct points for. What a "dead page" means is that the user will see a "Login" button but there won't be any functionality when that button is clicked until the JavaScript has been loaded in. Now you've created more problems. You either have to forget about some interactive elements or spend a lot of time making sure your JavaScript loads before any user would be able to click a button. That doesn't sound like fun work.

SSR also introduces you to another problem: how are you going to go about authenticating your user? You're going to have to forward your cookies, tokens etc to the API for authorization/authentication. This means you could never cache the result either because it's dependent on the user.

SSR will solve some of your problems but if you're not careful, it could create just as many.

### Why must APIs be so infuriating?

APIs are there to bring the frontend to life. Give us the data we need so that we can show it to the world. Such a pure concept but the execution is nothing short of the [Red Wedding](https://www.youtube.com/watch?v=ZnxvUuSzbMI) from Game of Thrones.

For example, a REST API that follows the practise of not coupling too many things is going to result in the frontend having to make multiple requests just to display one page. Get me my permissions but also get me a list of users. Oh, also get me my profile data. Duh.

This is an incredibly annoying and tedious process, yet, I understand and accept it. We can't put all that data into one endpoint because then we're crossing concerns and mixing data objects together. I understand this and so I make multiple API calls to cater for the backend's philosophies. But what if my frontend philosophy is to not have to make 3 API calls before I'm allowed to even render anything to the user? Will the backend surrender to my frontend's will?

There is a disjoint between backend/APIs and frontend applications. Each have constructured their own way of doing things, best practises and so on. This is done without the other in mind. A backend without a frontend makes for a nearly impossible user experience that would only allow for users who have a good understanding of HTTP requests to be able to make use of the system. A frontend without a backend is just as pointless as a static website without any content.

We have the convention of using JSON so that our frontend doesn't have to care about what language the API it's making a request to uses. But what if it should? What if writing backend code and frontend code to not only work together but to also make each other better, without one compromising for the other, was possible? In a perfect world...

### Where will the web be 10 years from now?

I'm not even going to pretend to know the answer to this. The enhancements of sites like [Wix](https://www.wix.com/) scare me because potential client could have everything then they need right there, in a nice drag-and-drop UI. Potential clients that want to make use of my deep React knowledge could eventually replace me with something like [GPT-3](https://en.wikipedia.org/wiki/GPT-3) if it gets to the point that it could seemlessly integrate, build and improve upon your code.

If we all still have jobs 10 years from now, this is how I see it: There will be a need for less developers that currently because automation, maintanence and general development time will be made easier by new tools. JavaScript will continue to be the most popular languages unless we somehow stumble into a new internet. Only 1 or 2 of the big 3 (React, Angular, Vue) will survive. The reason being because the sheer amount of extra things you need to know in order to be profeccient at one will cause companies to only starting developing in one framework. When this happens, it could quickly cause an increase in popularity of one and we'll see what happened with JavaScript all over again. I'm personally looking forward to this and my money is on React.

---

This post may seem pessimistic or negative which is hardly the case. We need to challenge and question everything. Questioning one of the most important inventions in human history and how we continue to build that invention is probably one of the greatest quetions we can ask ourselves as web developers.
