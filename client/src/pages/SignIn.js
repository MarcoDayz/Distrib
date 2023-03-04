import axios from 'axios';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading';
import AppContext from "../context/AppContext";
import distrib from '../lib/icons/Distrib.png';

const SignIn = () => {
    const nav = useNavigate()
    const {userAuth, setUserAuth, setUserName,
        setIsLoading, isLoading, responseMessage,
        setResponseMessage, setUserId} = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [peek, setPeek] = useState('password')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const accountObj = {
            email: email,
            password: password
        }
        try {
            // const {data} = await axios.post('http://localhost:4000/account/sign-in',accountObj)
            const {data} = await axios.post('https://distrib-api.onrender.com/account/sign-in',accountObj)

            // console.log(data)
            if(!data.auth){
                setIsLoading(false)
                setError(data.error)
                setUserAuth(data.auth)
                return
            }
            setUserName(data.userName.user_firstname)
            setUserId(data.userName.user_id)
            sessionStorage.setItem("userId", data.userName.user_id)
            setUserAuth(data.auth)
            sessionStorage.setItem("distroUser", data.auth)
            sessionStorage.setItem("currentUser", data.userName.user_firstname)
            setIsLoading(false)
            setError(data.message)
            nav(`/dashboard/${data.userName.user_firstname}`)
            handleReset()
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleInput = (e) => {
        const elem = e.target.name
        if(elem === 'password'){
            setPassword(e.target.value)
            setPeek('password')
        }else{
            setEmail(e.target.value)
        }
        setError('')
        setResponseMessage('')
        setUserAuth(false)
    };

    const toggle = () => {
        if(peek === 'password'){
            setPeek('text')
        }else{
            setPeek('password')
        }
    };

    const handleReset = () => {
        setEmail('')
        setPassword('')
        setPeek('password')
        setUserAuth(!userAuth)
    };



    return (
        <>
            <nav className="navbar">
                <img src={distrib} style={{width: '3.5rem'}}/>
            </nav>
            <div className="dashboard-main">
                <div className="form-container">
                    <form className="loginForm" onSubmit={handleLogin}>
                    {isLoading? 
                        <Loading />
                        :
                        <>
                        <div className="login-inputs">
                            <div className="label-inputs">Email
                                <input required 
                                className="signIn-input"
                                name="email"
                                type="email"
                                placeholder='name@example.com'
                                pattern=".+@example\.com"
                                value={email}
                                onChange={handleInput}
                                autoComplete="off" />
                            </div>
                            <div className="label-inputs">Password
                                <input required
                                className="signIn-input"
                                name="password"
                                type={peek}
                                value={password}
                                autoComplete="off"
                                onChange={handleInput}/>
                                    <input type="button"
                                    onClick={toggle}
                                    value="peek" />
                            </div>
                        </div>
                        <div className="login-buttons">
                                <input className="login-Btn" type="submit" value="Sign In" />
                            <p>or</p>
                                <input className="login-Btn" type="button" value="Create Account" onClick={() => nav("/register")}/>
                        </div>
                        </>
                        }
                        </form>                    
                    <div>
                        {responseMessage.length !== 0? 
                        <p style={{color: "green", paddingTop: '1rem', textAlign: 'center'}}>{responseMessage}
                            <br/>
                            Please Sign In
                        </p>
                        :
                        null
                        }
                        <p style={userAuth? {color: "green"} : {color: "#990000"}}>{error}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SignIn;