import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

import {FaBars} from 'react-icons/fa';
import distrib from '../lib/icons/Distrib.png'

const Navbar = () => {
    const {setUserAuth, toggleSidebar} = useContext(AppContext)
    const nav = useNavigate()

    const signOut = () => {
        setUserAuth(false)
        sessionStorage.clear()
        nav('/')
    };

    return (
        <nav className="navbar">
            <div className="icon-container">
                <span onClick={toggleSidebar} className='react-icons'>
                    <FaBars />
                </span>
            </div>
            <h3 className="navbar-title">
                <img style={{width: "3.5rem"}} src={distrib}></img>
            </h3>
            <h3 className="navbar-signout" onClick={signOut}>Sign Out</h3>
        </nav>
    )
};

export default Navbar;