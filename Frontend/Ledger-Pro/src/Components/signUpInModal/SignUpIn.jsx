import React, { useEffect } from 'react'
import './SignUpIn.css'
import { BiLock, BiUser, BiEnvelope, BiNotepad} from 'react-icons/bi'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myImage from "/src/assets/LP-logo-white.png";

function SignUpIn() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);


    const [username, setUsernameLogin] = useState("")
    const [password, setPasswordLogin] = useState("")
    const [user, setUser] = useState(null)

    const attemptLogin = async (e) => {
        e.preventDefault()

        const loginData = {
            username,
            password
        }

        const url = "http://127.0.0.1:5000/login"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }

        try{
            const response = await fetch (url, options)
            if (response.status !== 201 && response.status !== 200){
                const data = await response.json()
                alert(data.message)
            } else {
                const data = await response.json()
                setUser(data.user)
                navigate("/Home", {state: {user: user} })   
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        if(user){ 
            navigate("/Home", {state: {user: user} })  
        }
    }, [user]);

  return (
    <div className='login-modal-body'>
        <div className={`login-container ${isActive ? "active" : ""}`} >
            <div className="form-box login">
                <form onSubmit={attemptLogin}>
                    <h1>Login</h1>
                    <div className="login-input-box">
                        <input type="text" placeholder="Username"  value={username} onChange={(e) => setUsernameLogin(e.target.value)} required/>
                        <i><BiUser /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPasswordLogin(e.target.value)} required/>
                        <i><BiLock /></i>
                    </div>
                    <div className="forgot-link">
                        <a href="">Forgot Password?</a>
                    </div>
                    <button type="submit" className="bttn">Login</button>
                </form>
            </div>

            <div className="form-box register">
                <form action="">
                    <h1>Register</h1>
                    <div className="login-input-box">
                        <input type="text" placeholder="First Name" required/>
                        <i><BiUser /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="text" placeholder="Last Name" required/>
                        <i><BiUser /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="password" placeholder="Password" required/>
                        <i><BiLock /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="date" placeholder="Date of Birth" required/>
                        <i><BiNotepad /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="email" placeholder="Email" required/>
                        <i><BiEnvelope /></i>
                    </div>
                    <Link className="link" to="/Home"><button type="submit" className="bttn">Sign up</button></Link>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <img src={myImage} alt="" />
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    <button onClick={() => setIsActive(true)} className="bttn register-btn">Register</button>
                    <Link className="link" to="/"><h2>back to home</h2></Link>
                </div>

                <div className="toggle-panel toggle-right">
                    <img src={myImage} alt="" />
                    <h1>Welcome Back!</h1>
                    <p>Already have an account</p>
                    <button onClick={() => setIsActive(false)} className="bttn login-btn">Login</button>
                    <Link className="link" to="/"><h2>back to home</h2></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpIn