## React Native Chat App

This app will provide users with a chat interface and options to share images and their location.
It works on both IOS and Android devices.

## Key Features

- Entering the name and choosing the background color of the chat screen.
- Chat screen with an input field and submit button.
- Communication Features: Sending images from phone gallery, taking a photo, and sending location.
- Data gets stored online and offline.

## Pre-requisite

Before installing Expo, ensure you have a suitable version of Node installed.
At the time of writing, Expo only supports Node 16.. at max.

- Initial a new node.js (npm init)
- Node version 16.19.0
  `nvm install 16.19.0`
  `nvm use 16.19.0`
  `nvm alias default 16.19.0`
- Install dependencies: `npm install`

## Dependencies

- Create a react-native project using expo:
- Install expo CLI globally `npm install -g expo-cli`
- Google Firebase: for backend server (data storage) `npm install firebase@10.3.1 --save`
- Gifted Chat Library
- Expo ImagePicker
- Expo MediaLibrary
- Expo Location
- Gifted Chat : https://github.com/FaridSafi/react-native-gifted-chat

## Getting Started

1. Clone this repository: git clone https://github.com/Sogolsa/chat-app.git
2. Set up Expo:

- Install expo CLI: `npm install -g expo-cli`
- Install expo go app
- Create and expo account

## Setting up the Firestore Database

- Sign up for Google Firebase.
- Create a project if it's your first project.
- Add a new project if you already have projects.
- Choose a name for your project.
- For this project I disabled Google Analytics.

### Set up Firestore database:

- left-hand side menu > Build > Firestore Database > Create Database Button
- Select the location to store Cloud Firestore data.
- Database ID is set to Default
- From the dropdown menu, select the location where your Users are located.
- Start in production mode
- Under Data Tab > click "Start Collection" > choose a name (messages)
- Click on "Auto ID" to auto-generate a document ID > Save. (New messages will be saved in this collection)
- Click on the "Rules Tab": `allow read, write: if true;`
- Click Publish
- Choose a platform to start the app:
  Project Setting (left-hand side) > General Tab > Your Apps > Web (</>).
- Give the app a Nickname and Register.
- Copy firebaseConfig and paste it in you App.js

### Implementing Authentication for the app

- Firestore Dashboard > Authentication > Get Started > Sign in method > Anonymous > Save
- Anonymous Option:

### Set up Firebase Storage

- Build > Storage > Get Started > Default options > Next
- Rules Tab > `allow read, write: if true;`
- Publish

## Download Expo Go on Your Mobile Device and Android Studio on Your Device

`npx expo start`

- If it doesn't connect try `npx expo start --tunnel`
- Make sure the IP address on your computer matches the expo IP
