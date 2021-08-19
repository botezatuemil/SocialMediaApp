import React, {useContext, useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Card, UserImg, UserInfo, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider } from '../styles/FeedStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

import { AuthContext } from '../navigation/AuthProvider';
import firebase from 'firebase';
import { db } from '../firebase';

const PostCard = ({item, onDelete, onPress}) => {

    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    let likeIcon = item.liked ? 'heart' : 'heart-outline';
    let likeIconColor = item.liked ? '#2e64e5' : '#333';

    if (item.likes == 1) {
        likeText = '1 Like';
    } else if (item.likes > 1) {
        likeText = item.likes + ' Likes'
    } else {
        likeText = 'Like';
    }

    if (item.comments == 1) {
        commentText = '1 Comment';
    } else if (item.comments > 1) {
        commentText = item.likes + ' Comments'
    } else {
        commentText = 'Comment';    
    }

    const getUser = async() => {
        await firebase.firestore()
        db.collection('users')
        .doc(item.userId)
        .get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                console.log("user data", documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <Card>
            <UserInfo>
                <UserImg source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' :
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
                <UserInfoText>
                   <TouchableOpacity onPress={onPress}>
                    <UserName>{userData ? userData.fname || 'User': 'User'} {userData ? userData.lname || 'name' : 'name'} </UserName>
                   </TouchableOpacity>
                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>

            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImg source={{uri: item.postImg}}/> : <Divider/>}

            <InteractionWrapper>
                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor}/>
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>

                <Interaction> 
                    <Ionicons name="md-chatbubble-outline" size={25}/>
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>

                {user.uid == item.userId ?
                <Interaction onPress={() => onDelete(item.id)}> 
                    <Ionicons name="trash-bin" size={25}/>
                </Interaction>
                : null}   
            </InteractionWrapper>
        </Card>
    );
}

export default PostCard;