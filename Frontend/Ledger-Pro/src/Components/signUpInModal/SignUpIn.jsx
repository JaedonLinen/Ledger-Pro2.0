import React, { useEffect } from 'react'
import './SignUpIn.css'
import { BiLock, BiUser, BiEnvelope, BiNotepad} from 'react-icons/bi'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myImage from "/src/assets/LP-logo-white.png";
import LoadingModal from '../loadingModal/LoadingModal';

function SignUpIn() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);


    const [username, setUsernameLogin] = useState("")
    const [password, setPasswordLogin] = useState("")
    const [user, setUser] = useState(null)
    const [attempts, setAttempts] = useState(0)
    const [suspended, setSuspended] = useState(false)
    const [errorAttempts, setErrorAttempts] = useState("")

    const attemptLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (suspended) {
            setLoading(false)
            alert("You are suspended please try again in 5 min")
        } else {
            
            const loginData = {
                username,
                password
            }

            const url = "https://render-flask-deployment-ivut.onrender.com/login"
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
                    setAttempts(attempts + 1)
                    setErrorAttempts(`${attempts + 1} attempt(s) failed, you have ${3 - (attempts + 1)} tries left`);
                    if(attempts === 2){
                        setSuspended(true)
                    }
                    const data = await response.json()
                    setLoading(false)
                    alert(data.message)
                } else {
                    const data = await response.json()
                    setLoading(false)
                    setUser(data.user)
                    navigate("/Home", {state: {user: user} })   
                }
            } catch (error) {
                setLoading(false)
                alert(error.message);
            }
        }
    }


    const [firstName, setfirstName] = useState("")
    const [passwordHash, setPasswordR] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [dateOfBirth, setDOB] = useState("")
    const role = "Accountant"

    const attemptRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        

        if (errorPW) {
            setLoading(false)
            alert(errorPW)
        } else {
            const registerData = {
                firstName,
                passwordHash,
                lastName,
                email,
                dateOfBirth,
                role
            }

            const url = "https://render-flask-deployment-ivut.onrender.com/register_user"
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            }

            try{
                const response = await fetch (url, options)
                if (response.status !== 201 && response.status !== 200){
                    const data = await response.json()
                    setLoading(false)
                    alert(data.message)
                } else {
                    setLoading(false)
                    const data = await response.json()
                    setUser(data.user)
                    navigate("/Home", {state: {user: user} })   
                }
            } catch (error) {
                setLoading(false)
                alert(error.message);
            }
        }
    }

    const [errorPW, setError] = useState("")

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPasswordR(newPassword);
      
         // Regular expressions for validation
        const startsWithLetter = /^[A-Za-z]/.test(newPassword);  // Must start with a letter
        const hasLetter = /[A-Za-z]/.test(newPassword);  // Must contain at least one letter
        const hasNumber = /\d/.test(newPassword);  // Must contain at least one number
        const hasSpecialChar = /[\W_]/.test(newPassword);  // Must contain at least one special character
        const minLength = newPassword.length >= 8;  // Minimum length of 8

        // Error handling
        if (!minLength) {
            setError("Password must be at least 8 characters.");
        } else if (!startsWithLetter) {
            setError("Password must start with a letter.");
        } else if (!hasLetter) {
            setError("Password must contain at least one letter.");
        } else if (!hasNumber) {
            setError("Password must contain at least one number.");
        } else if (!hasSpecialChar) {
            setError("Password must contain at least one special character.");
        } else {
            setError(""); // Clear error if valid
        }
      };

    useEffect(() => {
        if(user){ 
            navigate("/Home", {state: {user: user} })  
        }
    }, [user]);

    const [loading, setLoading] = useState(false)

  return (
    <div className='login-modal-body'>
        {loading && <LoadingModal />}
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
                    <div className="forgot-link-container">
                        <Link to="/ForgotPassword" className='forgot-link'><p>Forgot Password?</p></Link>
                    </div>
                    <button type="submit" className="bttn">Login</button>
                    <p style={{ color: "red" }}>{errorAttempts}</p>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={attemptRegister}>
                    <h1>Register</h1>
                    <div className="login-input-box">
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} required/>
                        <i><BiUser /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} required/>
                        <i><BiUser /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="password" placeholder="Password" value={passwordHash} onChange={(e) => setPasswordR(e.target.value)} onBlur={handlePasswordChange} required/>
                        <i><BiLock /></i>
                    </div>
                    {errorPW && <p style={{ color: "red" }}>{errorPW}</p>}
                    <div className="login-input-box">
                        <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDOB(e.target.value)} required/>
                        <i><BiNotepad /></i>
                    </div>
                    <div className="login-input-box">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <i><BiEnvelope /></i>
                    </div>
                    <button type="submit" className="bttn">Sign up</button>
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