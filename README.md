
## **Global dependencies:**

Vue CLI - 3.12.1

NodeJS - v12.19.0

Npm - 6.14.18

## Set up a project

### Project setup

**yarn install**


### Compiles and hot-reloads for development

**yarn serve**

  

### Compiles and minifies for production

**yarn build**

  

### Run your unit tests

**yarn test:unit**

  

### Lints and fixes files

**yarn lint**


I implemented 3 pages:

1.  Main page
    
2.  Page with the show details
    
3.  Error page
    

**Main page** contains filters by genres, ratings, full list of shows previews and a search form. Search is implemented on client side for now, but I would consider to use public API for the text search.

**Details page** can be accessed by the url `/shows/:id`. It contains detailed info retrieved from the response.

**Error page** is shown for the missing urls.

I splitted the components into two functional groups: atoms and components. Atoms present general components like dropdown, search. Components present container component approach.

Almost each component is covered with unit tests which either check their logic or do a match with the snapshots.

**Todo (things that I would consider to do next):**

There are two types of synchronization and they can complement each other:

-  Implement vuex-persist to keep results in local storage
- Put actions in another place to make them more reusable
- Add internalization
- Improve stylings
	
