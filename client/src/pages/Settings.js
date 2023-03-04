import { useContext } from "react";
import AppContext from "../context/AppContext";

const Settings = () => {
    const {setIsOn} = useContext(AppContext)

    return (
        <div className="dashboard-main" onClick={()=>setIsOn(false)}>
            <div className="test">
            <h2>Settings Page</h2>
            </div>
        </div>
    )
};

export default Settings;