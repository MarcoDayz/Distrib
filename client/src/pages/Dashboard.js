import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const Dashboard = () => {

    return (
        <div className="dashboard">
            <Navbar />
            <SideBar />
            <Outlet />
        </div>
    )
};

export default Dashboard;