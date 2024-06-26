import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { getStorage } from 'firebase/storage';

import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Initialize a connection for firestore
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';

// prevent the warning message
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  });
  const firebaseConfig = {
    apiKey: 'AIzaSyD-CJIDGmhdunYSg6w-AAZcwgPIcD1occk',
    authDomain: 'chat-app-3a20c.firebaseapp.com',
    projectId: 'chat-app-3a20c',
    storageBucket: 'chat-app-3a20c.appspot.com',
    messagingSenderId: '129253650015',
    appId: '1:129253650015:web:738b249c58a7a5473635ea',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  // allowing the React Native app to read and write data to and from the database
  const db = getFirestore(app);

  //Initializing a handler for to Firestore Storage for uploading the blob into firebase storage
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
