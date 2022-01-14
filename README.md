# Brass Mart

A demo webstore built with a Keystone.js GraphQL database, Next.js front-end and Apollo client using Stripe for credit card transactions. 

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Server (Back End)](#server-back-end)
    - [Approach](#approach)  
    - [ERD Model](#erd-model)
  - [Client (Front End)](#client-front-end)
    - [Approach](#approach)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

After graduating from the General Assembly Software Engineering Immersive (SEI) I felt like I had the fundamentals to approach a career as a software engineer, but I also had some questions. The question this project aims to solve for myself is "how do I hand off a website to a client that can be easily managed by a non-technical person. Using Keystone.js I was able to create a database for my webstore with an Admin UI that allows the site administrator to manage users, view orders, and add, delete, or modify products directly from the database, eliminating the need for front-end CRUD that could cause an unnecessary security risk.


<br>

## MVP

_**Brass Mart** MVP will be a fully functioning webstore that will allow users to complete the full cycle of ordering available products and view past orders. The front-end will be styled in a minimal, clean, contemporary style and the database will have a fully functioning Admin UI that will allow users to add, delete, or modify products._

<br>

### Goals

- Full CRUD on back end with soft delete for availability
- Filtering for different product types with pagination
- Front- and back-end user authentication with stateless session handling
- Dynamic user cart with seamless add/remove functionality
- Fully functioning credit card processing with available test card
- Admin UI for database emphasizing ease of use by non-technical user
- Custom mutations for cart add/removal functionality and placing orders

<br>

### Libraries and Dependencies

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|   Keystone 6  | Back-end framework that turns your database into a headless CMS with GraphQL API |
|      React       | Front-end framework for effeciently rendering single-page applications|
|      Next      | Framework built on React for automatic route generation, hybrid static & server-side rendering |
|   Apollo Client | GraphQL platform for consuming GraphQL API |
| Stripe | Payment engine enabling processing of credit card transactions |
| Ant Design | Visual framework and component library |

<br>

### Database (Back End)

#### Approach

As mentioned above, one of my biggest questions was how to hand off a finished project to a non-technical client and have them be able to easily modify content, like in the case of products in an ecommerce platform. Fortunately, the Wes Bos Advanced React course (https://advancedreact.com/) was incredibly helpful in helping me answer this question. 

Once I completed the course I decided to create this project with the additional goal of updating the tech stack to use the most recent stable versions of everything available. By far the most significant change was in updating for Keystone 6 (Keystone 5 is used in the course) and I had to make some pretty substantial changes to cross over.

One of the biggest changes was that Keystone 6 deprecated support for MongoDB and now only uses Prisma on top of either a MySQL or PostgresQL database. 

While many changed were relatively quick and intuitive changes after the initial setup, much of the Keystone documentation had not been updated for version 6 and I was frequently greeted by "Coming soon!" when looking something up in the documentation. 

Another major change was in the required syntax for many built-in Keystone methods. For example, in my custom mutation for adding an item to the user's cart, first the current user's cart is queried which uses this syntax for the findMany method in Keystone 5:

```
// the id variable can be passed a value and will check for equality
const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });

```

Where as in Keystone 6:

```
// the id variable must now always be passed an object with an operator and the value
const allCartItems = await context.db.CartItem.findMany({
          where: { user: { id: {equals: sesh.itemId} }, product: { id: {equals: productId} } },
        });

```

This was an easy fix and highlights some easy ways to add functionality with custom mutations, for example making them automatically case-insensitive by replacing the 'equals' operator with 'like'. In the end, all of these changes have helped my understanding of how Keystone works by giving me plenty of changes to troubleshoot.

#### Functionality

The end result has been perfectly aligned with my goal of a database accessible to someone with no technical experience as pictured below:

>Instead of json, the database looks looks like this after login.

![Admin UI Dashboard](https://i.imgur.com/tY3bw8cl.png)

>Products can be created or modified directly within the GUI and handles associations.

![Product Creation](https://i.imgur.com/h2FDhAhl.png)

>Users can view all entries in any given table and filter by any property.

![View All Orders](https://i.imgur.com/8VdAGorl.png)
<br>

#### ERD Model

![ERD image](https://i.imgur.com/ZHRvyNvl.png)

<br>

### Client (Front End)

![Front-end screenshot](https://i.imgur.com/5VJdWGul.png)
<br>

#### Approach

For my project's front end my goal was to design a clean, minimal application that followed best practices for design and user interactions. I used it as an excuse to implement Next.js, which supports server and client-side rendering to help increase performance, as well as translating your file structure into routes, bypassing the need for explicit route declaration. I also used Apollo Client to handle GraphQL queries to the database. To handle the visual styling I used the Ant Design framework and component library, which allowed me to write very little css and usually only have to get involved to change the positioning of elements. Ant Design's component library is also a powerful tool because of its built-in functionality. For example their Form component and its related children has all input handling built in, bypassing the need for a useForm() custom hook or comparable handler I had been accustomed to creating. Between Next and Antd I eliminated close to 30% of the total code I would have had to write or the front end, saving quite a bit of time even with the learning curve of utilizing many features for the first time. 


## Code Issues & Resolutions

> Currently in progress:
> Completed project v1 was functioning as it should in development, but after deployment there has been an issue with the request headers not being properly sent between the client and database. The signin mutation is receiving a success code but the user is missing from the returned headers.
