import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
        //VIDEO NUMBER 70 CWH / SOME BACKEND WORK REQUIRED
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/app/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),

            });
            const json = await response.json();
            console.log(json);
            //Actually I used try/catch because there is some work left for backend otherwise used alert in if/else  (login.js/Signup.js)
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert("Login Sucessfully", "success");
            } else {
                // throw new Error("Invalid Credentials");
                 throw new Error(" ");
            }
        } catch (error) {
            // console.error("Error during login:", error.message);
            // alert("Invalid Credentials. Please sign up first.");
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-2'>
            <h2>Login to continue to eNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
