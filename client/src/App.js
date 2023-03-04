import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.js";
import SignIn from "./pages/SignIn.js";
import Register from "./pages/Register.js";
import Loading from "./components/Loading.js"

import AppContext from "./context/AppContext";
import PathValidation from './context/PathValidation.js';
import MainHub from './pages/MainHub.js';
import Inventory from './pages/Inventory.js';
import OrderHistory from './pages/OrderHistory.js';
import Settings from './pages/Settings.js';
import RoutePage from './pages/RoutePage.js';
import StorePurchaseOrder from './pages/StorePurchaseOrder.js';
import NewOrder from './pages/NewOrder.js';

const App = () => {
    const {userAuth, setUserAuth, userName, setUserName, rerender, currentRoute, setCurrentRoute, currentPurchaseOrder, setCurrentPurchaseOrder} = useContext(AppContext)

    useEffect(() => {
        const isAuth = sessionStorage.getItem("distroUser")
        const user = sessionStorage.getItem("currentUser")
        const currentStore = sessionStorage.getItem('currentRoute')
        const sessionPurchaseOrder = sessionStorage.getItem("storePurchaseOrder")
        if(isAuth){
            if(currentStore){
                setCurrentRoute(currentStore)
            }
            if(user){
                setUserName(user)
            }
            if(sessionPurchaseOrder){
                setCurrentPurchaseOrder(sessionPurchaseOrder)
            }
            return setUserAuth(isAuth)
        }else{
            return
        }

    },[rerender])

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={userAuth? <PathValidation auth={userAuth} userName={userName}/> : <SignIn />}/>
                <Route path={`/dashboard/${userName}`} element={<Dashboard />}>
                    <Route path={`/dashboard/${userName}`} element={<MainHub />}/>
                    <Route path={`/dashboard/${userName}/${currentRoute}`} element={<RoutePage />}/>
                    <Route path={`/dashboard/${userName}/${currentRoute}/order/${currentPurchaseOrder}`} element={<StorePurchaseOrder />}/>
                    <Route path={`/dashboard/${userName}/neworder`} element={<NewOrder />}/>
                    <Route path={`/dashboard/${userName}/inventory`} element={<Inventory />}/>
                    <Route path={`/dashboard/${userName}/history`} element={<OrderHistory />}/>
                    <Route path={`/dashboard/${userName}/settings`} element={<Settings />}/>
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path='/loading' element={<Loading />} />
                <Route path="/*" element={<h1>ERROR PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    )
};

export default App;