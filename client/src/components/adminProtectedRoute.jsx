import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(state => state.admin.isLoggedIn);

    return (
        isLoggedIn ? children : <Navigate to="/admin/login" />
    )
}

export default AdminProtectedRoute;