import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const image = require('../img/background-image.png');

  //   const handleColorSelection = (color) => {
  //     setSelectedColor(color);
  //   };

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
            <Button
              title='Start Chatting'
              color='#FFFFFF'
              onPress={() =>
                navigation.navigate('Chat', {
                  name: name,
                  selectedColor: selectedColor,
                })
              }
            />
          </View>
        </View>
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
  },
});
export default Start;
