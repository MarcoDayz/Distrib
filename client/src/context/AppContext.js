import { useState, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({children}) => {
    //state for login/sign up
    const [userAuth, setUserAuth] = useState(false)
    const [userId, setUserId] = useState(0)
    const [userName, setUserName] = useState(null)
    const [currentRoute, setCurrentRoute] = useState('')
    const [storeId, setStoreId] = useState('')
    const [rerender, setRerender] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [currentPurchaseOrder, setCurrentPurchaseOrder] = useState('')

    //Main hub state
    const [routeSum, setRouteSum] = useState('')
    //fetching store data state (RoutesTable)
    const [storeData, setStoreData] = useState([])
    //fetch store order history state (Route)
    const [storeOrders, setStoreOrders] = useState([])
    //routePage
    const [recentOrder, setRecentOrder] = useState([])
    const [totalSales, setTotalSales] = useState(0)
    //inventory page state
    const [inventory, setInventory] = useState([])
    //Store puchase order data
    const [purchasedOrders, setPurchasedOrders] = useState([])


    //state for sidebar
    const [isOn, setIsOn] = useState(false)

    //func to calculate total
    const calculateTotalNetSales = (arr) => {
        let total = 0
        arr.forEach(element => {
            total += parseFloat(element.order_total)
            setTotalSales(total.toFixed(2))
        });
        sessionStorage.setItem('storeTotal', total.toFixed(2))
    };

    const calculateRouteTotal = (arr) => {
        let sum = 0;
        arr.forEach(route => {
            if(route.store_totalsales === null){
                route.store_totalsales = "0.00"
            }
            sum += parseFloat(route.store_totalsales)
            setRouteSum(sum.toFixed(2))
        });
        sessionStorage.setItem('storesTotal', sum.toFixed(2))
    };

    const calculateItemTotal = (price, qty) => {
        const total = parseFloat(price) * parseInt(qty)
        return total.toFixed(2)
    };

    const currentDateTime = (str) => {
        const currentDate = new Date()
        // console.log(currentDate)
        if(str === 'date'){
            const day = currentDate.getDate()
            const month = currentDate.getMonth()
            const year = currentDate.getFullYear()
            const date = `${month + 1}/${day}/${year}`
            return date
        }else if(str === 'time'){
            let ampm = 'AM'
            let hours = currentDate.getHours()
            const min = currentDate.getMinutes()
            const sec = currentDate.getSeconds()
            if(hours > 12){
                hours = hours - 12
                ampm = 'PM'
            }
            const time = `${hours}:${min}:${sec} ${ampm}`
            return time
        }else{
            return 'arguement needs to be "date" or "time"'
        }
    };

    const makeRandomId = () => {
        let result = '';
        // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return parseInt(result);
    };

    const toggleSidebar = () => {
        setIsOn(!isOn)
    };

    return (
        <AppContext.Provider
        value = {{
            userAuth,
            setUserAuth,
            userId,
            setUserId,
            userName,
            setUserName,
            isOn,
            setIsOn,
            toggleSidebar,
            currentRoute,
            setCurrentRoute,
            rerender,
            setRerender,
            isLoading,
            setIsLoading,
            responseMessage,
            setResponseMessage,
            storeId,
            setStoreId,
            storeOrders,
            setStoreOrders,
            currentPurchaseOrder,
            setCurrentPurchaseOrder,
            storeData,
            setStoreData,
            recentOrder,
            setRecentOrder,
            totalSales,
            setTotalSales,
            calculateTotalNetSales,
            calculateRouteTotal,
            routeSum,
            setRouteSum,
            makeRandomId,
            currentDateTime,
            inventory,
            setInventory,
            purchasedOrders,
            setPurchasedOrders,
            calculateItemTotal}}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContext;