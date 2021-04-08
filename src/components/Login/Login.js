import React, { useContext, useState } from 'react';
import "firebase/auth";
import { initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, signInWithFb } from './loginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebook } from '@fortawesome/free-brands-svg-icons';
import {  faGoogle } from '@fortawesome/free-brands-svg-icons';




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
        if (createUser && user.userName && user.email && user.password) {
            // console.log(user);
            if(user.password === user.repeatPassword){
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
            else{
                alert("Password combinations doesn't matched");
            }
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
        <div className="row container-fluid justify-content-center align-items-center">

            <div className="col-sm-3 bg-secondary m-3 p-5 rounded">
                <h2>Login</h2>



                <form onSubmit={handleSubmit}>

                    {createUser && <div className="form-group">
                        <input type="text" className="form-control" name="userName" onBlur={handleBlur} placeholder="User name" required />
                    </div>
                    }

                    <div className="form-group">
                        <input type="email" className="form-control" name="email" onBlur={handleBlur} placeholder="Your email address" required />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onBlur={handleBlur} placeholder="Password" required />
                    </div>

                    {
                        createUser &&
                        <div className="form-group">
                            <input type="password" className="form-control" name="repeatPassword" onBlur={handleBlur} placeholder="Repeat Password" required />
                        </div>
                    }

                    <div className="form-group">
                        <input type="submit" className="btn btn-warning btn-block" value={createUser ? 'Sign Up' : 'Sign In'} />
                    </div>

                </form>

                <input type="checkbox" onChange={() => setCreateUser(!createUser)} name="newUser" />
                <label htmlFor="newUser">Don't have an account? <span>Sign Up</span></label>

                <hr />


                <div className="form-group">
                    <button className="btn bg-white btn-block" onClick={googleSignIn}><FontAwesomeIcon className="fa-2x text-success float-left"   icon={faGoogle} /> Continue with Google</button>
                </div>

                <div className="form-group">
                    <button className="btn bg-white btn-block" onClick={fbSignIn}><FontAwesomeIcon className="fa-2x float-left" style={{color: '#4285F4'}} icon={faFacebook} /> Continue with Facebook </button>
                </div>


            </div>
        </div>
    );
};

export default Login;