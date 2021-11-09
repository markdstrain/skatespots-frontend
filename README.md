## Overview 
This app will focus on pinning spots on a map that have places that are fun to skateboard at.  The project will be a full stack application using a React//Redux front end and a Node back end using an Express framework.  The project will use restful routes that create users, spots and their attributes, and user comments.  It will implement secure routing by using hashed passwords and json web tokens.  The back end will send the front end two json web tokens:  one jwt sent as an http cookie that  will act as an access token that will expire in a short duration and the second will be sent to local storage as a refresh token. The latter will have a significantly longer duration and will be used to update the access token.

The frontend will be in React/Redux and will access the backend api and also the Mapbox api.  It will have routes that offer location of skate spots, skate spot profiles, user profiles, user login and registration, and capabilities for user to make comments on each location.  It will take advantage of react bootstrap styles, axios calls, and react/redux state.  

# Schema

![Image of Schema]( ./public/images/Schema.png)

# Images of App

![Image of Schema]( ./public/images/Login.png)
![Image of Schema]( ./public/images/Register.png)
![Image of Schema]( ./public/images/SpotLocator.png)
![Image of Schema]( ./public/images/SpotInfo.png)
![Image of Schema]( ./public/images/SpotSelect.png)
![Image of Schema]( ./public/images/SpotDetailForm.png)


# Getting Started with Create React App

## Libraries
axios <br>
bootstrap <br>
react <br>
react-bootstrap<br>
react-dom<br>
react-router-dom<br>
react-scripts<br>
web-vitals

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
