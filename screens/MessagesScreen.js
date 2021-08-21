import React, {useState, useEffect} from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyle';

import moment from 'moment';
import firebase from 'firebase';
import { db } from '../firebase';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];


const MessagesScreen = ({navigation, route}) => {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const getChatScreen = async() => {
        try {
            const list = [];
            await firebase.firestore();
            await db.collection('chats')
            //.orderBy('postTime', 'desc')
            .get()
            .then(querrySnapshot => {
                querrySnapshot.docs.forEach(doc => {
                    const {userId, userName, messageText, postTime, userImg} = doc.data();
                    list.push({
                        id: doc.id,
                        //userId,
                        userName, 
                        messageText,
                        postTime,
                        userImg,
                    })
                })
            })
            setPosts(list);

            if(loading) {
                setLoading(false);
            }
        }
        catch(e) {
            console.log("something went wrong!", e);
        }
    }

    useEffect(() => {
        getChatScreen();
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading])

    return (
        <Container>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{uri: item.userImg}}/>
                            </UserImgWrapper>

                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.userName}</UserName>
                                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.messageText}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})