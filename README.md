# React Native + Firebase workshop

## Before start

- Install yarn

```
$ brew install yarn
```

- Clone this repo, and install the dependencies:

```
$ yarn
```

- Install expo-cli globally

```
$ yarn global add expo-cli
```

- Install expo client in your device:

  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS App Store](https://itunes.com/apps/exponent)

- Run the project and open it in your device.

```
$ yarn start
```

- Scan the QR code to open the expo app.

> Note: Your mobile device should be in the same network of your computer.

## Instructions

The content of each exercise is inside the /exercises folder. To test each one, you should import the exercise you want to do in `App.js`. Also, the solution of each exercise is inside /solutions folder.

## Develop the project from zero

### Init the expo project

- To create an application called `PostApp` in this case, you have to run:

```
$ expo init PostApp
```

- Choose an empty template and name it `PostApp`.

### Create a database in Firebase

Follow [Firebase official guides](https://firebase.google.com/docs/firestore/quickstart)

Or made this quick guide:

- In the [Firebase console](https://console.firebase.google.com/), click `Add project` with the project name `PostApp`. The project ID and analytics account are optional.
- Then, add a web app with the project name `PostApp Web` and copy the firebaseConfig variable.
- Go to the `Cloud Firestore` tab, and click on the `Create database` button. Check Start in test mode. Select the default region and `Done`.
- Create a new collection, called `Posts` with the following attributes:

```md
title -> string
body -> string
createdAt -> timestamp
author -> string
```

## Config your application to connect with firebase

- Add `firebase` dependency:

```
$ yarn add firebase
```

- Create a file with firebase configuration:

```
$ touch firebase.js
```

```js
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  // YOUR CREDENTIALS HERE
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
```

And now you could do the exercises written in this workshop.
