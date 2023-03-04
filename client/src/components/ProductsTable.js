import { useContext, useEffect } from "react";
import axios from "axios";
import {GrAddCircle} from "react-icons/gr";

import AppContext from "../context/AppContext";
import Product from "./Product";
import Loading from "../components/Loading.js"

const ProductTable = () => {
    const {inventory, setInventory, setIsLoading, isLoading} = useContext(AppContext)

    useEffect(() => {
        setIsLoading(true)
        try {
            const getProducts = async () => {
                const response = await axios.get('http://localhost:4000/inventory/products')
                setInventory(response.data)
                // console.log(response.data)
                setIsLoading(false)
            }
            getProducts()
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }, [])

    return (
        <div className="hub-main">
            <div className="hub-headers">
                <h3>Items</h3>
            </div>
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
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Sale Price</th>
                            <th>Qty</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((product, index) => (
                            <Product product={product} key={index}/>
                        ))}
                    </tbody>
                </table>
                }
            </div>
            {/* <div className="hub-headers">
                <br/>
                <h4 ><GrAddCircle className="icons" onClick={() => console.log('this worked')}/> New Item</h4>
            </div> */}
        </div>
    )
};

export default ProductTable;