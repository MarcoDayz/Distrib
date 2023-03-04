import axios from 'axios';
import { useState, useContext } from "react";
import AppContext from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import distrib from '../lib/icons/Distrib.png';
import Loading from '../components/Loading';

const Register = () => {
    const nav = useNavigate()
    const {responseMessage, setResponseMessage, isLoading, setIsLoading} = useContext(AppContext)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')        
    const [confirmPW, setConfirmPW] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordInputType, setPasswordInputType] = useState('password')
    const [confirmInputType, setConfirmInputType] = useState('password')
    const [inputError, setInputError] = useState(false)
    const [auth, setAuth] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        if(inputError) return
        setIsLoading(true)
        try {
            const newAccount = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                confirmPassword: confirmPW
            }
            const response = await axios.post('http://localhost:4000/account/sign-up', newAccount)
            if(!response.data.auth){
                setResponseMessage(response.data.error)
                setAuth(response.data.auth)
                setIsLoading(false)
                return
            }
            setResponseMessage(response.data.error)
            setAuth(response.data.auth)
            // console.log(response.data) 
            setIsLoading(false)        
            handleFormReset()
            nav('/')
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleInputs = (e) => {
        const inputElem = e.target.name

        if(inputElem === 'password'){
            setPassword(e.target.value)
            setPasswordInputType('password')
        }else if(inputElem === 'confirmPassword'){
            handlePasswordErrors(e.target.value)
            setConfirmPW(e.target.value)
            setConfirmInputType('password')
        }else if(inputElem === 'email'){
            setEmail(e.target.value)
        }else if(inputElem === 'firstname'){
            setFirstName(e.target.value)
        }else{
            setLastName(e.target.value)
        }
        setResponseMessage('')
    };

    const handleFormReset = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmPW('')
        setPasswordInputType('password')
        setConfirmInputType('password')
    };

    const handlePasswordErrors = (value) => {
        if(password !== value){
            setPasswordError('Password doesn\'t match')
            setInputError(true)
        }else{
            setPasswordError('')
            setInputError(false)
        }
    };

    const toggleInputType = (e) => {
        const elem = e.target.name
        if(elem === "passwordBtn" && passwordInputType === "password"){
            setPasswordInputType("text")
        }else if(elem === "passwordBtn" && passwordInputType === "text"){
            setPasswordInputType("password")
        }else if(elem === "confirmBtn" && confirmInputType === "password"){
            setConfirmInputType('text')
        }else{
            setConfirmInputType('password')
        }
    };

    return (
        <>
            <nav className="navbar">
                <img src={distrib} style={{width: '3.5rem'}}/>
            </nav>
            <div className="dashboard-main">
                {/* <Link to={'/'}>Return to Login</Link> */}
                <form className="loginForm-register" onSubmit={handleSignUp}>
                    {isLoading? 
                        <Loading />
                    :
                    <>
                        <div className="login-inputs-r">
                            <div className="label-inputs">First Name
                                <input required
                                autoComplete="off"
                                name="firstname"
                                className="signIn-input"
                                value={firstName}
                                onChange={handleInputs}
                                type="text" />
                            </div>
                            <div className="label-inputs">Last Name
                                <input required
                                autoComplete="off"
                                name="lastname"
                                className="signIn-input"
                                value={lastName}
                                onChange={handleInputs}
                                type="text" />
                            </div>
                            <div className="label-inputs">Email
                                <input required
                                placeholder='name@example.com'
                                pattern=".+@example\.com"
                                autoComplete="off"
                                name="email"
                                className="signIn-input"
                                value={email}
                                onChange={handleInputs}
                                type="email"/>
                            </div>
                            <div className="label-inputs">Password
                                <input required
                                autoComplete="off"
                                name="password"
                                className="signIn-input"
                                value={password}
                                onChange={handleInputs}
                                type={passwordInputType}/>
                                    <input type="button"
                                    name="passwordBtn"
                                    value="Peek" 
                                    onClick={toggleInputType}/>
                            </div>
                            <div className="label-inputs">Confirm Password
                                <input required
                                autoComplete="off"
                                name="confirmPassword"
                                className="signIn-input"
                                type={confirmInputType}
                                value={confirmPW}
                                onChange={handleInputs}/>
                                <input type="button"
                                    name="confirmBtn"
                                    value="Peek"
                                    onClick={toggleInputType} />
    
                            </div>
                            <p style={{color: "#990000"}}>{passwordError}</p>
                        </div>
                        <div className="login-buttons">
                            <input className="login-Btn"
                            type="submit"
                            value="Sign Up" />
                            <p>or</p>
                            <input className="login-Btn"
                            type="button"
                            value="Return"
                            onClick={() => nav('/')}/>
                        </div>
                    </>
                    }
                </form>
                <div>
                    <p style={auth? {color: "green"} : {color: "red"}}>{responseMessage}</p>
                </div>
            </div>
        </>
    )
};

export default Register;