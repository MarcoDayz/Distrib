import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const SideBar = () => {
    const {isOn, userName, toggleSidebar} = useContext(AppContext)
    const nav = useNavigate()

    const handleClick = (e) => {
        const elem = e.target.id
        nav(elem)
    };

    return (
        <div className='sidebar'>
            <div className={`sidebarWindow-${isOn}`}>
                <ul className='items' onClick={toggleSidebar}>
                    <li id={`/`} onClick={handleClick}>Routes</li>
                    <li id={`/dashboard/${userName}/inventory`} onClick={handleClick}>Invetory</li>
                    <li id={`/dashboard/${userName}/history`} onClick={handleClick}>Orders</li>
                    {/* <li id={`/dashboard/${userName}/settings`}  onClick={handleClick}>Settings</li> */}
                </ul>
            </div>
        </div>
    )
};

export default SideBar;