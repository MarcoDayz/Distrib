import { useNavigate, Navigate } from "react-router-dom";

const PathValidation = ({auth, userName}) => {
    const nav = useNavigate()
    if(userName === null || userName === '' || userName === undefined){
        return nav('/')
    }
    if(auth){
        return <Navigate to={`/dashboard/${userName}`}/>
    }
    return nav('/')
    
};

export default PathValidation;