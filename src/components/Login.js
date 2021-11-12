import React from "react";

const Login = (props) => {

    return (
        <main>
        <div id="login">
            <div className="form">
                <div className="logo"><img src="logo.png" alt="" /> slackvion</div>
                <h1>Login to your account</h1>
                <div className="second">Please enter your work email and password.</div>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>

                <div className="second">No account yet?<br />
                    <a href="#">Click here to create one</a>
                </div>
            </div>
        </div>
        </main>
    );
}

export default Login;
