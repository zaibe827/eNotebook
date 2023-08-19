import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try{
    const response = await fetch("http://localhost:5000/app/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Sucessfully", "success");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch(error){
    props.showAlert("Invalid Credentials", "danger");
  }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container mt-2'>
    <h2>Create an account to use eNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" minLength={5} required name="password" onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" minLength={5} required name="cpassword" onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup;
