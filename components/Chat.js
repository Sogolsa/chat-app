import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const { name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);

  // Effect hook to set the user name, service message and user message
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to JavaScript Date
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    // Clean up code to avoid memory leakage
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  // Function to handle sending messages
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
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
          _id: route.params.userID,
          name: route.params.name,
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
