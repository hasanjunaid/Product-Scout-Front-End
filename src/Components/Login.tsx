import React, { useState } from 'react';
import './CSS/signup.css';
import { useNavigate } from 'react-router-dom';
import doc2 from './Image/s1.png';
import doc3 from './Image/s2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const login = () => {
        if (password !== "" && username !== "") {
            fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                }),
            }).then((response) => {
                response.json().then((body) => {
                    if (body['message'] === 'Logged in successfully') {
                        navigate('/select-category');
                        sessionStorage.setItem("email", username);
                    } else {
                        toast.error(body['error']);
                    }
                })
            });
        }
    }

    return (
        <div className='sip'>
            <ToastContainer />
            <img className='a2' src={doc3} alt='s'/>
            <img className='a1' src={doc2} alt='h'/>
            <div className='mainlogin'>
                <h1 className='l1'>Welcome Back</h1>
                <p className='p1'>Login back to an account to enjoy all the services.</p>
                <br />
                <input
                    className="search-input-login"
                    type="text"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                />
                <br />
                <input
                    className="search-input-login"
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <div className='button-signup' onClick={login}>Login</div>
                <p className='p236'>Do not have an account? <span className='underline' onClick={() => { navigate("/signup") }}>Sign Up</span></p>
            </div>
        </div>
    )
}
