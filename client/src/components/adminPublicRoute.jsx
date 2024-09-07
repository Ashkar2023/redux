import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPublicRoute = ({children}) => {
    const { isLoggedIn } = useSelector(state => state.admin);

    return (
        isLoggedIn ? <Navigate to="/admin/dashboard" /> : children
    )
}

export default AdminPublicRoute