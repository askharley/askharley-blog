---
title: "We Use Flutter And So Should You"
date: "2020-12-30"
path: "/we-use-flutter-and-so-should-you"
coverImage: "../images/09-we-use-flutter-and-so-should-you.png"
author: "Harley Ferguson"
excerpt: "Flutter. It's awesome. Here's why."
tags: ["mobile development"]
---

<sub><sup>Photo by Pallavi Wattamwar on Medium.</sup></sub>

If you like to stay on the bleeding edge of software development, then you may have heard of Flutter. If you haven't heard of Flutter, then you're about to find out why it's great and why you should be using it for your mobile app development.

This article isn't designed to directly compare Flutter to every other framework and assign a winner at the end of the day. This is more one man's opinion (who has used a ton of different frameworks and tools for developing mobile applications) on why Flutter is his favourite mobile SDK and why it could be yours.

---

### What is Flutter?

Flutter is a UI SDK (software development kit) created and maintained by Google. Flutter can currently be used to build applications for Android, iOS, Linux, Mac and Windows devices. Flutter was initially released in May of 2017 but only really started getting the attention of the community around 2018. Flutter allows you to write a single code base that can be used to create multiple applications than run natively. Flutter makes use of a programming language called Dart.

### What is Dart? 

Dart is a programming language made by Google that is used to build Flutter applications. Dart boasts itself to be optimized for building UIs, however, Dart also allows for developers to build HTTP clients and services. This means that you could build a server using Dart as well as a single Dart code base that can build a whole host of applications on various platforms.

Some may find it frustrating that they would have to learn a new language in order to make use of Flutter but I'm here to tell you that picking up Dart is far easier than you think. Dart was designed to feel familiar to web developers. What this means is that the syntax and conventions in Dart were heavily inspired by JavaScript. Let's take a bit of a language tour to see how simple Dart actually is.

#### Variables

Dart doesn't require you to provide explicit types as it has type inference.

```
var title = 'Star Wars';
var year = 1997;
var wasSuccessful = true;
```

#### Functions

We don't have to declare the types here but it's suggested to follow this standard when writing functions.

```
int isEven(int n) {
  if (n % 2 === 0) {
    print("This number is odd.");
  } else {
    print ("This number is even.");
  }
}
```

#### Imports

The `import` keyword is used to access other libraries and files.

```
// Importing a core library
import 'dart:io';

// Importing an external package library
import 'package:provider/provider.dart';

// Importing local files
import 'package:my_app/src/path/to/the_file.dart
import '..path/to/the_file.dart';
```

#### Comments

```
// This is a single line comment

/// This is multiline comment.
/// This type of comment is usually used in documentation.

/* Occcasionally you may see a comment like this. */
```

#### Classes

```
class Person {
  // class members
  String name;
  int age;

  // Constructor
  Person(this.name, this.age) {
    // initialization code goes here
  }

  // Getter method
  int get personName => name;

  // A method sitting on the class
  bool isLegalAge() {
    if (age > 18) {
      return true;
    } else {
      return false;
    }
  }
}
```

### What makes Flutter so special?

Flutter allows us to build native applications from a single code base. This is a massive pro if you're needing to build a beautiful, scalable application on both iOS and Android but don't have the funding or means to build two separate native applications.

Flutter also make it incredibly simple to either run an emulator locally on your machine or to deploy it to your phone. Other tools require a large amount of setup or require you to learn a CLI while Flutter is close to offering a "plug and play" like feeling to getting your applications onto your devices.

Flutter also has built a very large, active and positive community. There are tons of articles, videos and answered questions about Flutter that will allow you to learn and grow rapidly.

[pub.dev](https://pub.dev/) is a site that allows you to find and use Dart and Flutter packages. The website is incredibly simple to use and makes finding new or potentially useful packages very easy.

The Flutter community along with the help of pub.dev have really built some truly amazing packages that are available for you to use today. Wether it be for state management or displaying a beautiful confirmation dialog, you'll find it there.

### How does Flutter work?

The Flutter docs themselves mention that the team that built the SDK drew great inspiration from React. In this fashion, everything in a Flutter is a widget (much like everything is a component in React). Widgets describe how a view should look based on what state is provided to the widget.

All of the widgets in your Flutter application fit together through a widget tree which defines the hierarchy of your application.

![Example Widget Tree](https://res.cloudinary.com/practicaldev/image/fetch/s--gCy5MuRs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/q0m1c1s77u7uky4zwh2m.gif)

Flutter also makes use of an element tree. The element tree is responsible for holding the widgets after they've been built. This process retains the logical structure of the user interface. Widgets are immutable which means that they cannot remember their relationships with other parent or children widgets. The element tree is also responsible for holding the state objects that stateful widgets require.

### What are Stateless and Stateful Widgets?

Stateless widgets do not require any mutable state. They are generally used to describe the UI by using structuring widgets, styling widgets or layout widgets. As they are stateless, everything is `final`.

Stateful widgets allow us to work with mutable state. Stateful widgets create a stage object (which will be held by the element tree) which has data that can be manipulated. Stateful widgets will inherit the `setState()` method which can be used to update the state object. Whenever `setState()` is called, the `build()` function for that widget will be rerun. This process will compare the new state with the previous state and rerender any changes that the UI needs to make. Once a widget's state has changed, it will mark itself as "dirty" and when the next frame comes along then it'll rerender that widget with the new state's implications.

Another amazing thing about Flutter is that it's designed stateful widgets to have a long life span. Let's think about it: if a parent widget is rerendered with new state then surely any state in child widgets would be lost, right? Wrong. Flutter holds onto the state in the element tree and if the "new" widget that is rerendered is the same type as the previous widget then Flutter will provide that widget with the last value of the state.

### What makes Flutter better than something like React Native or Ionic?

It's worth mentioning how incredibly easy it is to create your first Flutter app and get it onto your phone right away. Other frameworks require more setup to get to that point and can often cause headaches with their complexity.

Flutter also boasts an incredibly powerful [hot-reload](https://flutter.dev/docs/development/tools/hot-reload) functionality. Most SDKs also offer this but I've personally experienced great inconsistencies when dealing with React Native or Ionic's hot-reload. This ultimately improves the development time because you can very quickly view your changes to the code base without having to constantly reserve the application.

Flutter breaks the shackles introduced by the "JavaScript bridge" and is actually creating an application, not just an app wrapper over a web view (I'm looking at you Ionic). React Native does do a good job of building artifacts by making use of various compilers to make sense of the JavaScript code, however, these applications never really feel native. Flutter creates applications that are basically native and they feel that way. Flutter compiles the Dart code into native ARM machine code which gives the apps a native level of performance.

---

Hopefully this article has given you some insight into Flutter and potentially got you interested enough to give it a go.

We have several workshops on Flutter that start with the basics and progress to more advanced Flutter concepts that are going to be made available to the public. Feel free to give those a watch if you wish to have a further deep dive into Flutter and all of it's awesomeness.
