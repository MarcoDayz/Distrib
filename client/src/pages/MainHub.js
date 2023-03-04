import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

import RoutesTable from "../components/RoutesTable";

const MainHub = () => {
    const {userName, setIsOn, routeSum,
        setRouteSum, setUserId, setRerender, 
        rerender} = useContext(AppContext)


    useEffect(() => {
        const storesTotal =  sessionStorage.getItem("storesTotal")
        const sessionUserId = sessionStorage.getItem('userId')
        if(sessionUserId !== undefined)(
            setUserId(sessionUserId),
            setRerender(!rerender)
        )
        if(storesTotal){
            // console.log(storesTotal)
            setRouteSum(storesTotal)
        }else if(!storesTotal){
            setRouteSum("0.00")
        }
    },[])

    return (
        <div className="dashboard-main" onClick={()=>setIsOn(false)}>

            <div className="test">
            <h2>Welcome {userName}</h2>
            <p>**Delete is not functional**</p>
            </div>
            <RoutesTable />
            <div className="table-totals-container">
                <h3>Total Sales: ${routeSum}</h3>
            </div>
        </div>
    )
};

export default MainHub;