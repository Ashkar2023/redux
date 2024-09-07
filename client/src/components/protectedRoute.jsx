import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    console.log(isLoggedIn)
    const location = useLocation();
  return (
        isLoggedIn ? children : <Navigate to="/login" state={{from:location}}/>
  )
}

export default ProtectedRoute