# ReactJS frontend with Typescript for Spring Boot Playground Project

### Application description
It is necessary to create an application that allows users to register and after successful registration to create an album and add/upload images to the album. While adding images, the user can add hashtags or tag other users.

All other registered users can see the homepage where they should be able to search for images using hashtags or user tags with suggestions. Also, users can give their rating to the image (thumbs up / down or like and dislike).

### Required functionality

- Homepage
  - list images
  - search images using hashtags or user tags with suggestions
  - if the user is logged in, display the rating buttons.
  - preselect button if user like or dislike specific image
- Profile
  - display all private albums
  - create a new private album
- Album Details
  - list images for the specified album
  - add a new image with suggestions for:
    - hashtags (#nature, #sun, #love, #cat)
    - user (foo@bar, john@doe)
- Login page
- Register page
  - send an email to the activate account

This project was bootstrapped with [Create React App2](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App2 documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
