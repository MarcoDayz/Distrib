import { useEffect, useState, useContext } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import AppContext from "../context/AppContext";

import CartTable from "../components/CartTable";

const NewOrder = () => {
    const nav = useNavigate()
    const {calculateItemTotal, currentDateTime, makeRandomId} = useContext(AppContext)
    const [item, setItem] = useState('')
    const [qty, setQty] = useState('')
    const [itemList, setItemList] = useState([])
    const [cartList, setCartList] = useState([])
    
    useEffect(() => {
        const getProductList = async () => {
            // const response = await axios.get('http://localhost:4000/inventory/products')
            const response = await axios.get('https://distrib-api.onrender.com/inventory/products')
            // console.log(response.data)
            setItemList(response.data)
        }
        getProductList()
    }, []);

    const handleChange = (e) => {
        const elem = e.target.name
        if(elem === 'item'){
            setItem(e.target.value)
        }else if(elem === 'qty'){
            if(e.target.value.includes('.'))return
            setQty(e.target.value)
        }else{
            return
        }
    };

    const resetForm = () => {
        setItem('')
        setQty('')
    };

    const handleAddToCart = (e) => {
        e.preventDefault()
        const prodObj = JSON.parse(e.target[0].value)
        const prodQty = e.target[1].value
        const newItem = {
            item_id: prodObj.product_id,
            item_name: prodObj.product_name,
            item_price: prodObj.product_price,
            item_qty: prodQty,
            item_total: calculateItemTotal(prodObj.product_price, prodQty)
        }

        setCartList([...cartList, newItem])
        // console.log(cartList)
        resetForm()
    };

    const handleConfirmPurchase = async () => {
        const store = sessionStorage.getItem('store')
        let ordertotal = 0;
        // const currentStore = store
        let orderId = makeRandomId()
        const confirmPurchaseItems = cartList
        // console.log(cartList)
        
        try {
            //get totalsum
            confirmPurchaseItems.forEach(item => {
                item.item_total = parseFloat(item.item_total)
                ordertotal +=  item.item_total})

            const confirmedOrder = {
                order_id: orderId,
                order_total: ordertotal,
                order_date: currentDateTime('date'),
                order_salesperson: sessionStorage.getItem('currentUser'),
                user_id: sessionStorage.getItem('userId'),
                store_id: store
            }
            // console.log(confirmedOrder)
            // const createOrder = await axios.put(`http://localhost:4000/stores/new-order`, confirmedOrder)
            const createOrder = await axios.put(`https://distrib-api.onrender.com/stores/new-order`, confirmedOrder)

            console.log(createOrder.data)

            confirmPurchaseItems.forEach(async item => {
                // delete item.item_total
                item.order_id = orderId
                item.item_price = parseFloat(item.item_price)
                item.item_qty = parseInt(item.item_qty)
                // const purchaseresponse = await axios.put(`http://localhost:4000/stores/new-purchase`, item)
                const purchaseresponse = await axios.put(`https://distrib-api.onrender.com/stores/new-purchase`, item)

                console.log(purchaseresponse.data)
            })
            setCartList([])
            nav('/')
        } catch (error) {
            console.log(error)
        }

    };


    return (
        <div className="dashboard-main">
            <div className="test">
                <h1>New Order</h1>
            </div>
            <div>
                <form onSubmit={handleAddToCart}>
                    <label> Product
                        <select required={true}
                        placeholder="Select Item"
                        name="item"
                        value={item}
                        onChange={handleChange}>
                            <option>--Please choose an option--</option>
                            {itemList.map((item, index) => (
                                <option id={item.product_id} key={index} value={JSON.stringify(item)}>{item.product_name} / ${item.product_price}</option>
                            ))}
                        </select>
                    </label>
                    <label> Quantity
                        <input name="qty"
                        required={true}
                        style={{maxWidth: "3rem"}}
                        type="number"
                        min={1}
                        // max={1000}
                        value={qty}
                        onChange={handleChange}/>
                    </label>
                    <input type="submit" value="Add Cart"/>
                </form>
            </div>
            {/* cart component */}
            <CartTable cartList={cartList}/>
            <div>
                <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
            </div>
        </div>
    )
};

export default NewOrder;