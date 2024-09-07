import { useEffect } from "react";
import UserTable from "../../components/ui/table";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearAdmin } from "../../state/slices/adminSlice";

const Dashboard = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex h-screen flex-col">
            <Button variant="outlined" sx={{borderRadius:0}} onClick={()=>{
                dispatch(clearAdmin());
            }}>Logout</Button>
            <div className="flex-grow mx-auto mt-32">
                    <UserTable></UserTable>
            </div>
        </div>
    )
}

export default Dashboard