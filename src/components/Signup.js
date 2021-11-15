import React, { useState } from "react";
import FormNotif from "./FormNotif";

const Signup = (props) => {
    const {setPage} = props;
    const [notifMessage, setNotifMessage] = useState('');
    const [notifType, setNotifType] = useState(false);

    // go to login page
    const goLogin = (e) => {
        e.preventDefault();
        setPage('login');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirm_password.value;

        registerUser(email, password, confirmPassword);
    }

    const registerUser = (email, password, confirmPassword) => {
        const payload = {
            email: email,
            password: password,
            password_confirmation: confirmPassword
        }

        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        
        fetch(`${process.env.REACT_APP_SLACK_ENDPOINT}/auth`, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.status === 'error') {
                    // what to do if error
                    const fullMessages = data.errors.full_messages.map(error => {
                        return <li>{error}</li>
                    });
                    setNotifType('danger');
                    setNotifMessage(fullMessages);
                } 
                
                if(data.status === 'success') {
                    setNotifType('success');
                    setNotifMessage('Success! You may now login.');
                }
            })
    }

    return (
        <main>
            <div id="login">
                <div className="form">
                    <div className="logo"><img src="logo.png" alt="" /> slackvion</div>
                    <h1>Create your account</h1>
                    {notifType && <FormNotif messageType={notifType} message={notifMessage} />}
                    <div className="second">We suggest using the email address you use at work.</div>
                    <form onSubmit={onSubmit}>
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Password" />
                        <input type="password" name="confirm_password" placeholder="Confirm Password" />
                        <button type="submit">Create account</button>
                    </form>

                    <div className="second">
                        Already using slackvion? <br />
                        <a href="#" onClick={goLogin}>Click here to login</a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Signup;
