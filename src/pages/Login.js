import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import "../styles/Login.css";

function Login() {
    
    const history = useHistory(); //allows us to change the url once the user is authenticated

    //it's better to have an empty string than to have null
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            history.push('/')
        }).catch(error => alert(error.message))

    }

    const register = e => {
        e.preventDefault()
        
        auth.createUserWithEmailAndPassword(email,password).then((auth) => {
            //this successfully creates a new user with a new email & password
            console.log(auth);
            if (auth) {
                history.push('/');
            }
        }).catch(error => alert(error.message))
    }

    return (
        <div className="login">

            <Link to="/">
                <img className="login_logo" src="https://live.staticflickr.com/65535/51113414019_26397871d0_k.jpg" alt="amazon_logo_login_page" />
            </Link>

            <div className="login_container">

                <h1>Sign In</h1>

                <form>

                    <h5>Email</h5> <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5> <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button className="login_signIn_button" type="submit" onClick={signIn}>Sign In</button>
                    
                </form>

                <p>By signing in you're agreeing to Essentiel's condition of Use & Sale. Please see our Privacy Notice, our Cookies Notice and out Interest-Based Ads Notice</p>

                <button className="login_register_button" type="submit" onClick={register}>Start Shopping Today</button>

            </div>

        </div>
    )
}

export default Login;