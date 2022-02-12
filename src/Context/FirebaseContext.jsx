import React, { createContext, useState, useContext, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import FirebaseErrors from '../Firebase/FirebaseErrors';
import { useLanguageContext } from './LanguageContext';

const FirebaseContext = createContext(undefined);

export function FirebaseProvider(props) {
    const { userLanguage } = useLanguageContext();
    const [alertTrigger, setAlertTrigger] = useState(false);

    const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId,
        measurementId: process.env.REACT_APP_measurementId
    });
    // const db = getFirestore();
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    auth.languageCode = userLanguage;

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            if (currentUser.providerData[0].providerId === 'password') {
                updateProfile(auth.currentUser, { displayName: currentUser.email.split('@')[0] });
            }
        }
    });

    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log('GOOGLE USER', user);
                setUser(user);
            }).catch((error) => {
                console.log(error);
            });
    };

    //* FIX TWITTER LOGIN.
    // You currently have Essential access which includes access to Twitter API v2 endpoints only.
    // If you need access to this endpoint, you’ll need to apply for Elevated access via the Developer Portal
    const signInWithTwitter = async () => {
        signInWithPopup(auth, twitterProvider)
            .then((result) => {
                const user = result.user;
                console.log('TWITTER USER', user);
                setUser(user);
            }).catch((error) => {
                console.log(error);
            });
    };

    const signInWithEmailAndPassword = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName: email.split('@')[0]
            });
        } catch (error) {
            if (error.code === FirebaseErrors.emailInUse) {
                console.log('Email in use');
            }
        }
    };

    const logOut = async () => {
        await auth.signOut();
        setUser({});
        console.log('logged out');
    };

    const changeDisplayName = async (displayName) => {
        await updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(() => {
            setUser({ ...user, displayName: displayName });
        });
        if (!alertTrigger) {
            setAlertTrigger(true);
            setTimeout(() => { // Se borra la alerta después de 5 segundos
                setAlertTrigger(false);
            }, 5000);
        }
    };

    const value = useMemo(() => {
        return ({
            signInWithEmailAndPassword,
            auth,
            user,
            logOut,
            signInWithGoogle,
            signInWithTwitter,
            changeDisplayName,
            alertTrigger,
            setAlertTrigger
        });
    }, [auth, logOut, user, alertTrigger]);
    return <FirebaseContext.Provider value={value} {...props} />;
}

export function useFirebaseContext() {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebaseContext must be used within a FirebaseProvider');
    }
    return context;
}
