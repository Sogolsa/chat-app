import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Initialize a connection for firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// prevent the warning message
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// Create the navigator
const Stack = createNativeStackNavigator();
const App = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => <Chat db={db} {...props} />}
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
