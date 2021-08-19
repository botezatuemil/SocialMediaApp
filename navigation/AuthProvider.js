import React, { createContext, useState } from 'react';

import {auth, app, db} from '../firebase';
import firebase from 'firebase';

import { LogBox } from 'react-native';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

LogBox.ignoreLogs(['Setting a timer'])

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser,
                login: async (email, password) => {
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth.createUserWithEmailAndPassword(email, password);
                        db.then(() => {
                            firebase.firestore();
                            db.collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname: '',
                                lname: '',
                                email: email,
                                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                                userImg: null,
                            })
                            .catch(error => {
                                console.log("Something went wrong!", error)
                            })
                        })
                        .catch(error => {
                            console.log("something went wrong with signup!", error)
                        })
                    } catch(e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth.signOut();
                    } catch(e) {
                        console.log(e);
                    }
                },
                signinWithGoogle: async () => {
                    
                    await auth.signInWithPopup(provider).catch((error) => alert(error.message));
                    
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}