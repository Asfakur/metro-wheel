import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const createUserWithEmailAndPassword = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const userInfo = res.user;
            updateUserName(name); //when the user is created then it will update user name
            alert(userInfo.email + ' account  created successfully');
        })
        .catch((error) => {
            // alert(error.message + user.email + ' not created');
        });
}

const updateUserName = name => {
    const userFirebase = firebase.auth().currentUser;

    userFirebase.updateProfile({
        displayName: name
    }).then(() => {
        // console.log("User name Updated successfully.");
    }).catch(function (error) {
        console.log(error);
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in
            // alert(result.user.displayName + ' Logged in successfully');
            return result.user;
        })
        .catch((error) => {
            alert(error.message + ' Logging problem');
        });
}

export const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {

            return result.user;

        }).catch((error) => {
            alert(error.message);
        });
}

export const signInWithFb = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            return result.user;            
        })
        .catch((error) => {
            alert(error.message);
        });
}