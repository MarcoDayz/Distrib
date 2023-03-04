import { useContext } from "react";
import AppContext from "../context/AppContext";

const OrderHistory = () => {
    const {setIsOn} = useContext(AppContext)

    return (
        <div className="dashboard-main" onClick={()=>setIsOn(false)}>
            <div className="test">
            <h2>CURRENTLY WORKING ON</h2>
            <br/>
            <h2>My Order History Page</h2>
            <p>This page will reflect all orders YOU have made</p>
            </div>
        </div>
    )
};

export default OrderHistory;