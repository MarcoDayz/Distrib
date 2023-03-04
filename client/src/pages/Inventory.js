import { useContext } from "react";
import ProductTable from "../components/ProductsTable";
import AppContext from "../context/AppContext";

const Inventory = () => {
    const {setIsOn} = useContext(AppContext)

    return (
        <div className="dashboard-main" onClick={()=>setIsOn(false)}>
            <div className="test">
            <h2>My Inventory</h2>
            <p>This page reflects all products that the company distributes
                <br/>
                **QTY currently does not auto populate**
                <br/>
                **edit and delete button are not functional yet**
            </p>
            <br/>
            </div>
            <ProductTable />
        </div>
    )
};

export default Inventory;