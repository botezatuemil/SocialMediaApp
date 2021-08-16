import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
    
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        {
            _id: 2,
            text: 'Hello world',
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                    left: {
                        backgroundColor: '#dbdbdb',
                    }
                    
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    }
                }}

            />
        )
    }

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons 
                        name='send-circle' 
                        style={{
                            marginBottom: 5,
                            marginRight: 5,
                        }}
                        size={32} 
                        color="#2e64e5"
                    />
                </View>
            </Send>
        )
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
        />
    )
}

export default ChatScreen;