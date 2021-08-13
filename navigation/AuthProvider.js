import React, { createContext, useState } from 'react';
<<<<<<< HEAD
import auth from '@react-native-firebase/auth';
=======
import {auth} from '../firebase';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer'])
>>>>>>> tmp

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user, 
                setUser,
<<<<<<< HEAD
                // login: async (email, password) => {
                //     try {
                //         await auth().signInWithEmailAndPassword(email, password);
                //     } catch(e) {
                //         console.log(e);
                //     }
                // },
                // register: async (email, password) => {
                //     try {
                //         await auth().createUserWithEmailAndPassword(email, password);
                //     } catch(e) {
                //         console.log(e);
                //     }
                // },
                // logout: async () => {
                //     try {
                //         await auth().signOut();
                //     } catch(e) {
                //         console.log(e);
                //     }
                // }
=======
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
                }
>>>>>>> tmp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}