import axios from 'axios';
import { useEffect, useContext } from "react";
import AppContext from '../context/AppContext';

import Loading from "../components/Loading.js";
import Route from "./Route";

const RoutesTable = () => {
    const {storeData, setStoreData, calculateRouteTotal,
        isLoading, setIsLoading, userId,
        rerender, setRerender} = useContext(AppContext)

    useEffect(() => {
        setIsLoading(true)
        try {
            const getStores = async () => {
                // console.log(userId)
                //route to get by userID
                // const response = await axios.get(`http://localhost:4000/stores/all-stores/${userId}`)
                const response = await axios.get(`https://distrib-api.onrender.com/stores/all-stores/`)
                // console.log(response.data)
                calculateRouteTotal(response.data)
                setStoreData(response.data)
            }
            getStores()
        } catch (error) {
            console.log(error)
        }
        setRerender(false)
        setIsLoading(false)
    },[rerender])

    return (
        <div className="hub-main">
            <div className="hub-headers">
                <h3>Routes</h3>
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
                            <th>Name</th>
                            <th>Net Sales</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeData.map((route, index) => (
                            <Route route={route} key={index}/>
                        ))}
                    </tbody>
                </table>
            }
            </div>
        </div>
    )
};

export default RoutesTable;