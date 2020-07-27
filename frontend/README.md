# frontend

It has the following pages:

- `/`: the home page, with navbar and some simple text
- `/register`: page to register new users, it hits the `/users` API route
- `/login`: page to log users in, it hits the `/sessions` API route
- `/chat`: page with the users chat

At the moment there's a bug after you Log In, in which the link to the `/chat` page doesn't work. This is due to the fact that the component that doesn't allow unlogged users to got to that page is not refreshing the new session token that is on local storage.

The way to fix this is to use some kind of context to make it re render on session change. However due to time constraints, I haven't fixed it. To go to the `/chat` page you must go to it directly, or refresh the page so that the navbar link works.

Also, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
