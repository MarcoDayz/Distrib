import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

import Loading from "../components/Loading.js";

const RoutePage = () => {
    const nav = useNavigate()
    const {currentRoute, setCurrentRoute, userName, setIsOn,
        isLoading,storeOrders, setStoreOrders, setIsLoading,
        setCurrentPurchaseOrder, recentOrder, setRecentOrder,
        totalSales, setTotalSales, setPurchasedOrders} = useContext(AppContext)


    // const handleReturn = () => {
    //     nav(-1)
    // }

    const handleViewOrder = async (e) => {
        // console.log(e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText)
        setIsLoading(true)
        try {
            const response = await axios.get(`http://localhost:4000/stores/purchase-items/${e.target.id}`)
            console.log(response.data)
            setPurchasedOrders(response.data)
            setCurrentPurchaseOrder(e.target.id)
            sessionStorage.setItem("storePurchaseOrder", e.target.id)
            sessionStorage.setItem("purchasedOrderSum", e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText)
            sessionStorage.setItem("purchasedOrders", JSON.stringify(response.data))
            nav(`/dashboard/${userName}/${currentRoute}/order/${e.target.id}`)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)

        const sessionStoreData = sessionStorage.getItem('storeData')
        const sessionRecentOrder = sessionStorage.getItem('recentOrder')
        const sessionTotalSales = sessionStorage.getItem('storeTotal')
        const sessionCurrentRoute = sessionStorage.getItem('currentRoute')
        if(sessionStoreData){
            setStoreOrders(JSON.parse(sessionStoreData))
        }
        if(sessionCurrentRoute){
            setCurrentRoute(sessionCurrentRoute)
        }
        if(sessionRecentOrder){
            setRecentOrder(JSON.parse(sessionRecentOrder))
        }
        if(sessionTotalSales){
            setTotalSales(sessionTotalSales)
        }
        setIsLoading(false)
    }, [])

    return (
        <div className="dashboard-main" onClick={()=>setIsOn(false)}>
            <div className="test">
                <div style={{display: "flex", flexDirection: "column", width: "90%"}}>
                    <h1 style={{wordBreak: "break-all"}}>{currentRoute} page</h1>
                    <div>
                        {/* <button onClick={handleReturn}>Back to Routes</button> */}
                        <div>
                            <h4>Last Order Date: {recentOrder.to_char}</h4>
                            <h4>Order Number: {recentOrder.order_id}</h4>
                            <h4>Distributor Name: {recentOrder.order_salesperson}</h4>
                        </div>
                        <button onClick={() => nav(`/dashboard/${userName}/neworder`)}>New Order</button>
                            <h4>Order History</h4>
                        <div className="route-table">
                        {isLoading?
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "inherit", background: "#343944"}}>
                                <Loading />
                            </div>
                            :
                            <table>
                                <thead className="thead">
                                    <tr>
                                        <th>Order#</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th>Distributor</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        storeOrders.map((order, index) => (
                                        order.order_id === null?
                                            null
                                            :
                                            (<tr key={index}>
                                                <td>{order.order_id}</td>
                                                <td>${order.order_total}</td>
                                                <td>{order.to_char}</td>
                                                <td>{order.order_salesperson}</td>
                                                <td>
                                                    <button id={order.order_id} onClick={handleViewOrder}>
                                                        view
                                                    </button>
                                                </td>
                                            </tr>)
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                        </div>
                        <h4>Total Net Sales: ${totalSales}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RoutePage;