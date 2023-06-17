import { useCallback, useContext } from "react"; 
import {Route, Navigate} from "react-router-dom";
import { UserContext } from "../../App";

const ProtectedRoute = ({children}) => {
    const user = useContext(UserContext);

    if(!user || !user._id) {
        return <Navigate to="/"/>;
        
    }
    return children;
}
export default ProtectedRoute;