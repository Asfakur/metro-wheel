import React, { useContext, useState } from 'react';
import "firebase/auth";
import { initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, signInWithFb } from './loginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {

    const [user, setUser] = useState({});
    const [createUser, setCreateUser] = useState(false); //this state will show the sign up form

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    //redirect hooks
    let history = useHistory();
    let location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (event) => {

        let isFieldValid = true;

        if (event.target.name === 'password') {
            isFieldValid = event.target.value.length > 6;
        }

        //more validation
        //https://github.com/Asfakur/fire-auth-41-9/blob/main/src/App.js
        if (isFieldValid) {
            const newUser = { ...user }; //re add new property to the newUser From user 
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }


    }

    initializeLoginFramework();

    const setUserInfoToLogged = (result) => {
        if (result && result.email) {
            const userInfo = {
                name: result.displayName,
                email: result.email
            }
            setLoggedInUser(userInfo);

            // use history hooks
            history.replace(from);
        }

    }

    const handleSubmit = (e) => {
        if (createUser && user.userName && user.email && user.email) {
            // console.log(user);
            createUserWithEmailAndPassword(user.userName, user.email, user.password)
                .then(res => {

                    //auto login, its call the sign in email and pass method automatically
                    signInWithEmailAndPassword(user.email, user.password)
                        .then(res => {
                            setUserInfoToLogged(res);
                        })
                    //auto login ends
                })
        }

        if (!createUser && user.email && user.email) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUserInfoToLogged(res);
                })
        }
        e.preventDefault(); //when form is submit this function helps to automatically not to reload
    }

    const googleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                setUserInfoToLogged(res);
            })
    }

    const fbSignIn = () => {
        signInWithFb()
            .then(res => {
                setUserInfoToLogged(res);
            })
    }





    return (
        <div>
            <h1>This is login</h1>

            <input type="checkbox" onChange={() => setCreateUser(!createUser)} name="newUser" />
            <label htmlFor="newUser">New User Sign Up</label>

            <form onSubmit={handleSubmit}>

                {createUser && <input type="text" name="userName" onBlur={handleBlur} placeholder="Your user name" required />
                }
                <br />

                <input type="email" name="email" onBlur={handleBlur} placeholder="Your email address" required />
                <br />

                <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                <br />

                <input type="submit" value={createUser ? 'Sign Up' : 'Sign In'} />
            </form>

            <br />
            <button onClick={googleSignIn}>Continue with google</button>

            <br />
            <button onClick={fbSignIn}>Continue with Facebook</button>
        </div>
    );
};

export default Login;