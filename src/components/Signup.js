import React from "react";

const Signup = (props) => {
    const {setPage} = props;

    const goLogin = (e) => {
        e.preventDefault();
        setPage('login');
    }

    return (
        <main>
            <div id="login">
                <div className="form">
                    <div className="logo"><img src="logo.png" alt="" /> slackvion</div>
                    <h1>Create your account</h1>
                    <div className="second">We suggest using the email address you use at work.</div>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Create account</button>

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
