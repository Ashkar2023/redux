import Delete from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import { Button, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, deleteUser, fetchUsers } from '../../state/slices/adminSlice';
import AddUserModal from "./addUserModal";
import EditUserModal from "./editUserModal";


const UserTable = () => {
    const dispatch = useDispatch();
    const { users, reqStatus } = useSelector(state => state.admin);
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    const editUserOpen = (user) => {
        setOpen(true);
        setSelectedUser(user)
    }

    const editUserClose = () =>{
        setOpen(false);
        setSelectedUser(null)
    }

    const addUserOpen = ()=>{
        setOpen2(true);
    }

    const addUserClose = ()=>{
        setOpen2(false);
    }


    useEffect(() => {
        if (reqStatus === "idle") {
            dispatch(fetchUsers());
        };
        console.log("rendered")
    }, [dispatch]);

    const STableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.info.light,
            color: theme.palette.common.white
        }
    }));

    
    return (
        <>
            <TableContainer sx={{ minWidth:"800px",maxWidth: "1000px", maxHeight: "700px" }} component={Paper}>
                <div className='flex w-full min-h-12 bg-[#1f2937] justify-between'>
                    <Button size="small" variant="contained" sx={{margin:"10px"}} onClick={addUserOpen}>Add User</Button>
                    <div className='border-b m-1 w-1/3 content-center'>
                        <label htmlFor="search" className='self-center'><SearchIcon sx={{ color: "white", margin: "2px 0px" }} /></label>
                        <input type="text" id='search' onChange={(e) => { setQuery(e.target.value), filteredRows(query) }}
                            name='search' placeholder='search...'
                            className='bg-transparent outline-none text-white placeholder-slate-50 placeholder-opacity-50' />
                    </div>
                </div>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <STableCell>Email</STableCell>
                            <STableCell>Username</STableCell>
                            <STableCell>CreatedAt</STableCell>
                            <STableCell colSpan={3} align='center'>Actions</STableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            users.filter(user=>{
                                return query.toLowerCase() === ""
                                    ?   user
                                    :   user.email.toLowerCase().includes(query.toLowerCase());
                            }).map(user => (
                                <TableRow key={user.email}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                                    <TableCell align='center' sx={{ minWidth: "150px" }} >
                                        <Button variant={user.blocked ? "contained" : "outlined"}
                                            color={user.blocked ? "success" : "error"}
                                            onClick={() => dispatch(changeStatus(user.id))}
                                        >
                                            {user.blocked ? "Unblock" : "Block"}
                                        </Button>
                                    </TableCell>
                                    <TableCell align='center'><Button variant="outlined" className='' onClick={()=>editUserOpen(user)} >Edit</Button></TableCell>
                                    <TableCell align='center'><Button variant="text" color="error" sx={{minWidth:"20px"}} onClick={()=>dispatch(deleteUser(user.id))}><Delete/></Button></TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <EditUserModal open={open} handleClose={editUserClose} user={selectedUser} />
            <AddUserModal open={open2} setOpen2={setOpen2} />
        </>
    )
}

export default UserTable