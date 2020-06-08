# JavaScript/Front-end Developer - User List

## Instructions

- Fork this project.
- Commit the important milestones and not just the final result.
- Go with the exercises step by step
- Use those tools you can work the the quickest, the more effective with.
- Write a code what you don’t mind to present and you’re not lost in it.
- If you face a barrier or don’t understand something – try to find the right
	solution – be creative and independent.
- If you really get stuck ask for help, but in this case define your question
	thoroughly/exactly.
- Cover your code with test cases wherever you can.

## MVC Application

**Basic information**

Create a front-end application, where you can handle user objects stored on a
server-based application. The server is located at http://js-assessment-backend.herokuapp.com.
It provides a REST API for the User objects on the `/users`path. (`.json` extension is required unless the `Content-Type` header is `application/json`)

A user object has 6 attributes:

- `id` (mandatory, but the server automatically sets it)
- `first_name` (mandatory)
- `last_name` (mandatory)
- `status` (mandatory, values: [active, locked])
- `created_at` (mandatory, but the server automatically sets it)
- `updated_at` (mandatory, but the server automatically sets it)

The application’s routing should work, so that if I create a request to the
`/new` action, the new user form should be displayed.

### 1. exercise

Create the application’s first route, where the users are listed. The list
should contain each user’s `first_name`, `last_name` and `created_at` attributes.
The list should be able to **paginate on the front-end side**
(the backend doesn’t support paginating at all), display 10 users on each page.

### 2. exercise

Add a new action to the user list, with which you can activate/lock a user
object. A locked user should be displayed with strikethroughed attributes.
Use the update action when modifying the status field.

### 3. exercise

Append 2 new routes in your application. On the `/new` route you should be able
to create new users, on the `/edit` route the selected user’s attributes can be
modified. You should only be able to set the user’s first and last name.
Handle validation errors given back from the server, display the error message
next to the attribute’s label.

### 4. exercise

Unfortunately the site’s lazy designer disappeared without finalizing his work,
so we don’t have an exact design for the user list.

Make it nice, visually pleasing. You can use external CSS libraries or
frameworks. if you have time work on the mobile version so it would be usable.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
