import React, { useState } from "react";
import FormNotif from "./FormNotif";

const Login = (props) => {
    const {setPage} = props;
    const [error, setError] = useState(false);

    const loginToSlack = (email, password) => {
        const payload = {
            email: email, 
            password: password
        }
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetch(`${process.env.REACT_APP_SLACK_ENDPOINT}/auth/sign_in`, options)
            .then(response => {
                console.log(response)
                
                if(response.status == 200) {
                    // console.log(response.headers.get('uid'));
                    localStorage.setItem('uid', response.headers.get('uid'));
                    // console.log(response.headers.get('expiry'));
                    localStorage.setItem('expiry', response.headers.get('expiry'));
                    // console.log(response.headers.get('access-token'));
                    localStorage.setItem('access-token', response.headers.get('access-token'));
                    // console.log(response.headers.get('client'));
                    localStorage.setItem('client', response.headers.get('client'));
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                if(data.errors) {
                    setError(data.errors[0]);
                } else {
                    setError(false)
                    localStorage.setItem('user', JSON.stringify(data.data));
                    setPage('slack');
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        loginToSlack(email, password)
    }

    const goCreateAccount = (e) => {
        e.preventDefault();
        setPage('signup')
    }

    return (
        <main>
        <div id="login">
            <div className="form">
                <div className="logo"><img src="logo.png" alt="" /> slackvion</div>
                <h1>Login to your account</h1>
                {error && <FormNotif messageType="danger" message={error} />}
                <div className="second">Please enter your work email and password.</div>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
                <div className="second">No account yet?<br />
                    <a href="#" onClick={goCreateAccount}>Click here to create one</a>
                </div>
            </div>
        </div>
        </main>
    );
}

export default Login;
