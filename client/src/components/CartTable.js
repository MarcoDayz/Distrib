import { useContext } from "react";
import AppContext from "../context/AppContext";

import Loading from "./Loading";

const CartTable = ({cartList}) => {
    const {isLoading} = useContext(AppContext)

    return (
        <div className="hub-main">
            <h3>Cart Table</h3>
            <div className="route-table">
                {isLoading?
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "inherit", background: "#343944"}}>
                    <Loading />
                </div>
                :
                <table>
                    <thead className="thead">
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.item_name}</td>
                                <td>${parseFloat(item.item_price).toFixed(2)}</td>
                                <td>{item.item_qty}</td>
                                <td>${parseFloat(item.item_total).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
        </div>
    )
};

export default CartTable;