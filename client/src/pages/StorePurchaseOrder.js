import { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import AppContext from "../context/AppContext";

const StorePurchaseOrder = () => {
    const {currentPurchaseOrder, purchasedOrders, setPurchasedOrders, isLoading, setIsLoading, setIsOn} = useContext(AppContext)

    useEffect(() => {
        setIsLoading(true)
        const sessionPurchasedOrders = sessionStorage.getItem("purchasedOrders")
        if(sessionPurchasedOrders){
            setPurchasedOrders(JSON.parse(sessionPurchasedOrders))
        }
        setIsLoading(false)
    }, [])

    return (
        <div className="dashboard-main" onClick={()=>setIsOn(false)}>
            <div className="test">
                <br/>
                <h4>Purchase Order {currentPurchaseOrder}</h4>
                <br/>
                <div className="hub-main">
                    <div className="route-table">
                            {isLoading?
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "inherit", background: "#343944"}}>
                                    <Loading />
                                </div>
                                :
                                <table>
                                    <thead className="thead">
                                        <tr>
                                            <th>Item#</th>
                                            <th>Product</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchasedOrders.map((item, index) => (
                                                item.item_id === null?
                                                null
                                                :
                                                (<tr key={index}>
                                                    <td>{item.item_id}</td>
                                                    <td>{item.item_name}</td>
                                                    <td>{item.item_qty}</td>
                                                    <td>${item.item_price}</td>
                                                </tr>)
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                    </div>
                <h3>Purchase Total: {sessionStorage.getItem("purchasedOrderSum")}</h3>
                </div>
            </div>
        </div>
    )
};

export default StorePurchaseOrder;