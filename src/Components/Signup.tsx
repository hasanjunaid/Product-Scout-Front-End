import React, { useState } from 'react';
import './CSS/signup.css';
import { useNavigate } from 'react-router-dom';
import doc2 from './Image/s1.png';
import doc3 from './Image/s2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const signup = () => {
        // Email syntax validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
            return;
        }

        // Password confirmation
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Perform signup
        fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "username": username, // Changed from email to username
                "email": email, // You can still send email if needed
                "password": password,
            }),
        }).then((response) => {
            response.json().then((body) => {
                if (body['message'] === 'User created successfully') {
                    navigate('/login');
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("firsttime", "true");
                } else {
                    toast.error(body['error']);
                }
            });
        });
    };

    return (
        <div className='sip'>
            <ToastContainer />
            <img className='a2' src={doc3} alt='imag'/>
            <img className='a1' src={doc2} alt='images'/>
            <div className='mainsignin'>
                <h1 className='l1'>Create An Account</h1>
                <p className='p1'>Create an account to enjoy all the services without any ads for free!</p>
                <br />
                <input
                    className="search-input-login"
                    type="text" // Changed from email to text
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                />
                <br />
                <input
                    className="search-input-login"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleEmailChange}
                    value={email}
                />
                <br />
                <input
                    className="search-input-login"
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <br />
                <input
                    className="search-input-login"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                />
                <div onClick={signup} className='button-signup'>Create Account</div>
                <p className='p236'>Already have an account? <span className='underline' onClick={() => { navigate("/login") }}>Sign In</span></p>
            </div>
        </div>
    )
}
