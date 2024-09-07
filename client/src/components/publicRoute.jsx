import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {
    const { isLoggedIn } = useSelector(state => state.user);

    return (
        isLoggedIn ? <Navigate to="/" /> : children
    )
}

export default PublicRoute