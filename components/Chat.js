import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Effect hook to set the user name, service message and user message
  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: 'Hello Developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // Function to handle sending messages
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Function to handle the appearance of the chat bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name,
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior='padding' />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
