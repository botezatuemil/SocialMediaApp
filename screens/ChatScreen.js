import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const ChatScreen = ({route}) => {
    
    const [input, setInput] = useState("");

    const sendText = async() => {
        Keyboard.dismiss();

        firebase.firestore();
        db.collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            textMessage: input,
            email: auth.currentUser.email,
        })
        setInput("");
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={150}>
            <SafeAreaView>
                <View style={styles.inputBar}>
                    <TextInput
                        value={input}
                        placeholder="Type something..."
                        onChangeText={(text) => setInput(text)}
                        style={styles.textInput}
                    />
                </View>
                
                <TouchableOpacity style={styles.button} onPress={sendText}>
                    <Image
                        source={require('../assets/send.png')}
                        style={{
                            width: 60,
                            height: 60,
                            
                        }}
                    />
                </TouchableOpacity>

                <ScrollView>
                    
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}


export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputBar: {
        alignSelf: 'center',
        width: 350,
        height: 70,
        backgroundColor: '#fff',
        top: windowHeight / 1.3,
        borderRadius: 15,
    },
    button: {
        top: windowHeight / 1.45,
        marginLeft: 315,
    },
    textInput: {
        marginLeft: 40, 
        top: 20,
    }
})

    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     setMessages([
    //     {
    //         _id: 1,
    //         text: "tank",
    //         createdAt: new Date(),
    //         user: {
    //             _id: 2,
    //             name: 'React Native',
    //             avatar: 'https://placeimg.com/140/140/any',
    //         },
    //     },
    //     {
    //         _id: 2,
    //         text: 'Hello world',
    //         createdAt: new Date(),
    //         user: {
    //             _id: 1,
    //             name: 'React Native',
    //             avatar: 'https://placeimg.com/140/140/any',
    //         },
    //     },
    // ])
    // }, [])

    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

    // const renderBubble = (props) => {
    //     return (
    //         <Bubble
    //             {...props}
    //             wrapperStyle={{
    //                 right: {
    //                     backgroundColor: '#2e64e5',
    //                 },
    //                 left: {
    //                     backgroundColor: '#dbdbdb',
    //                 }
                    
    //             }}
    //             textStyle={{
    //                 right: {
    //                     color: '#fff',
    //                 }
    //             }}

    //         />
    //     )
    // }

    // const renderSend = (props) => {
    //     return (
    //         <Send {...props}>
    //             <View>
    //                 <MaterialCommunityIcons 
    //                     name='send-circle' 
    //                     style={{
    //                         marginBottom: 5,
    //                         marginRight: 5,
    //                     }}
    //                     size={32} 
    //                     color="#2e64e5"
    //                 />
    //             </View>
    //         </Send>
    //     )
    // }

    // return (
    //     <GiftedChat
    //         messages={messages}
    //         onSend={messages => onSend(messages)}
    //         user={{
    //             _id: 1,
    //         }}
    //         renderBubble={renderBubble}
    //         alwaysShowSend
    //         renderSend={renderSend}
    //         scrollToBottom
    //     />
    // )



