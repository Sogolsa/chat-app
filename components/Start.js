import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name: name,
          selectedColor: selectedColor,
        });
        Alert.alert('Signed in successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try again later.');
      });
  };
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const image = require('../img/background-image.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <Text style={styles.title}>Chat App</Text>
        <View style={styles.whiteBox}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your name here'
            placeholderTextColor='#757083'
          />
          <Text style={styles.text}>Choose Background Color: </Text>
          <View style={styles.colorOptionsContainer}>
            {colorOptions.map((color, index) => (
              <TouchableOpacity
                accessibility={true}
                accessibilityLabel='background color'
                accessibilityHint='lets you chose your background color'
                accessibilityRole='button'
                key={index}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color,
                    borderColor:
                      selectedColor === color ? 'black' : 'transparent',
                    opacity: selectedColor === color ? 1 : 0.7,
                  },
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              accessibility={true}
              accessibilityLabel='Start chatting'
              accessibilityHint='Takes you to the chat room'
              accessibilityRole='button'
              style={styles.button}
              onPress={signInUser}
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior='padding' />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 20,
  },
  whiteBox: {
    height: '44%',
    width: '88%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 60,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    opacity: 50,
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
  },

  buttonContainer: {
    backgroundColor: '#757083',
    borderRadius: 8,
    width: '88%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
export default Start;
