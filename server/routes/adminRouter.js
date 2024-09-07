import { Router } from "express";
import { client } from "../index.js";
import { hashPassword } from "../util/helper.js";
const admin_router = Router();

admin_router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email.trim() + password.trim())
    const hardcodedUsername = 'admin@gmail.com';
    const hardcodedPassword = 'password';

    if (email.trim() === hardcodedUsername && password.trim() === hardcodedPassword) {
        res.status(200).json({ message: 'Login successful', success: true });
    } else {
        res.status(401).json({ message: 'Invalid credentials', success: false });
    }
});

admin_router.get('/getusers', async (req, res, next) => {
    try {
        const { rows } = await client.query("SELECT id,email,username,created_at,blocked FROM users");
        if (rows) {
            res.status(200).json({
                message: "users fetched",
                success: true,
                users: rows.sort((a, b) => {
                    if (a.email < b.email) return -1;
                    if (a.email > b.email) return 1;
                    return 0;
                })
            });
        }
    } catch (error) {
        next(error);
    }
})

admin_router.get("/blockunblock", async (req, res, next) => {
    try {
        const result = await client.query("UPDATE users SET blocked = NOT blocked where id = $1", [req.query.id]);
        if (result.rowCount) {
            res.status(200).json({ message: "Blocked/Unblocked user", success: true });
        } else {
            throw new Error({message:"No rows updated",success:false})
        }
    } catch (error) {
        console.log(error.message)
        next(error)
    }
});

admin_router.post('/edituser/:id', async (req, res, next) => {
    try {
        const { email, username } = req.body;
        const result = await client.query("UPDATE users SET email = $2, username = $3 where id = $1", [req.params.id, email, username]);
        if (result.rowCount) {
            res.status(200).json({ message: "User Edited", success: true });
        } else {
            res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.log(error.error)
        next(error)
    }
});

admin_router.post('/adduser', async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        console.log(req.body)
        const hashedPassword = await hashPassword(password);

        const result = await client.query("INSERT INTO users (email,password,username) VALUES ($1, $2, $3)", [email, hashedPassword, username]);
        if (result.rowCount) {
            res.status(200).json({ message: "User Added", success: true });
        } else {
            console.log(result)
            res.status(404).json({ message: "couldn't add user", success: false });
        }
    } catch (error) {
        console.log(error.message)
        next(error)
    }
});

admin_router.delete("/delete/:id",async(req,res,next)=>{
    try{
        const result = await client.query("DELETE FROM users where id = $1",[req.params.id]);
        
        if (result.rowCount) {
            res.status(200).json({ message: "User deleted", success: true });
        } else {
            console.log(result)
            res.status(404).json({ message: "couldn't delete user", success: false });
        }
    }catch(error){
        console.log(error.message)
        next(error)
    }
})


export default admin_router;