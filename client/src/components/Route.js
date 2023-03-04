import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

import openIcon from '../lib/icons/open-in-browser.png';
import trash from '../lib/icons/trash.png';

const Route = ({route}) => {
    const nav = useNavigate()
    const {userName, setCurrentRoute, setRerender,
        rerender, setIsLoading, setStoreId,
        setStoreOrders, setRecentOrder, calculateTotalNetSales} = useContext(AppContext)

        // useEffect(() => {
        //     sessionStorage.setItem('store', JSON.stringify(route))
        // }, [])

    const handleView = async () => {
        setIsLoading(true)
        //using try catch block
        //make api call to the store id; returning all orders histories
        try{
            // const response = await axios.get(`http://localhost:4000/stores/orderhistory/${route.store_id}`)
            const response = await axios.get(`https://distrib-api.onrender.com/stores/orderhistory/${route.store_id}`)
            const recentOrder = response.data[0]
            sessionStorage.setItem('store', route.store_id)
            setStoreOrders(response.data)
            calculateTotalNetSales(response.data)
            setCurrentRoute(route.store_name)
            setStoreId(route.store_id)
            sessionStorage.setItem('currentRoute', route.store_name)
            sessionStorage.setItem('storeData', JSON.stringify(response.data))
            setRecentOrder(recentOrder)
            sessionStorage.setItem('recentOrder', JSON.stringify(recentOrder))
            nav(`/dashboard/${userName}/${route.store_name}`)
        }catch (error) {
            console.log(error.message)
            // setIsLoading(false)
        }
        setRerender(!rerender)
        setIsLoading(false)
    }

    const handleDelete = (e) => {
        console.log(` Deleted ${e.target.id}`)
    }


    return (
        <tr>
            <td className="store-td">
                <h4>{route.store_name}</h4>
                <span>#{route.store_id}</span>
            </td>
            <td>${route.store_totalsales}</td>
            <td><img id={route.store_id} className="icons" src={openIcon} onClick={handleView}/></td>
            <td><img id={route.store_id} className="icons" src={trash} onClick={handleDelete}/></td>
        </tr>
    )
};

export default Route;