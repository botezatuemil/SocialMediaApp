import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../navigation/AuthProvider';

import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const ChatScreen = ({route}) => {
    
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const {user, logout} = useContext(AuthContext);

    const sendText = async() => {
        Keyboard.dismiss();

        firebase.firestore();
        db.collection("chats")
        .doc(user.uid) 
        .collection("messages")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            textMessage: input,
            email: auth.currentUser.email,
        })
        setInput("");
    }

    useEffect(() => {
        firebase.firestore();
        const unsubscribe = db
        .collection('chats')
        .doc(user.uid)
        .collection('messages')
        .orderBy("timestamp", )
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));

        return unsubscribe;
    }, [route])

    let [fontsLoaded, error] = useFonts ({
        Lato_400Regular,
        Lato_700Bold
      });
    
    if (!fontsLoaded) {
        return <AppLoading/>
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
                        onSubmitEditing={sendText}
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

                
                <ScrollView style={styles.scroll}
                    ref={ref => scrollView = ref }
                    onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
                >
                    {messages.map(({id, data}) => 
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Text style={styles.textReceiver}>
                                    {data.textMessage}
                                </Text>
                            </View>
                        ) : (
                            <View  style={styles.sender}>
                                <Text style={styles.textSender}>
                                    {data.textMessage}
                                </Text>
                            </View>
                        )
                    )}
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
    },
    receiver: {
        alignSelf: 'flex-end',
        marginRight: 10,
        backgroundColor: '#003c95',
        maxWidth: '70%',
        maxHeight: '70%',
        position: 'relative',
        marginBottom: 5,
        //height: 50,
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        //top: -50,
    },
    textReceiver: {
        alignSelf: 'center',
        color: '#fff',
        marginLeft: 10,
        marginRight: 10,
        top: 15,
        marginBottom: 30,
        fontFamily: 'Lato_400Regular',
        //textAlignVertical: 'center',
        
    },  
    sender: {
        alignSelf: 'flex-start',
        marginRight: 10,
        backgroundColor: '#d1d1d1',
        maxWidth: '70%',
        maxHeight: '70%',
        position: 'relative',
        marginBottom: 5,
        justifyContent: 'center',
        borderTopLeftRadius: 14,
        borderBottomEndRadius: 14,
        borderBottomStartRadius: 14,
    },
    textSender: {
        alignSelf: 'center',
        color: '#fff',
        marginLeft: 10,
        marginRight: 10,
        top: 15,
        marginBottom: 30,
        fontFamily: 'Lato_400Regular',
    },
    scroll: {
        //flex: 1,
        top: -130,
        marginBottom: 350,
        height: 630,
        
    },
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



