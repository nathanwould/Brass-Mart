# Brass Mart

A demo webstore built with a Keystone.js GraphQL database, Next.js front-end and Apollo client using Stripe for credit card transactions. 

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Architecture](#component-architecture)
    - [Time Estimates](#time-estimates)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
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

### Client (Front End)

#### Wireframes

- Landing

![Landing Login Page](https://i.imgur.com/yjCcnE1.png)

- New Employee Registration

![Employee Registration](https://i.imgur.com/xpVnOwi.png)


- Movies

![Movies](https://i.imgur.com/zhOUpag.png)


- Movie Details

![Movie Details](https://i.imgur.com/cqueNZo.png)


- Movie Add/Edit

![Movie Form](https://i.imgur.com/PWztJ2G.png)



#### Component Tree

>Front-end application structure:


#### Component Architecture




### Database (Back End)

#### ERD Model


<br>

***

## Post-MVP

Post MVP goals include movie categories, tracking the number in stock and checked out, along with rental lengths, and when they are due back, and adding criteria to flag movies as 'new releases'. A styling post-MVP goal is to add more elements to make the experience feel like using a DOS machine like primarily using arrow keys and tab to navigate the application.

***

## Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

## Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution.
