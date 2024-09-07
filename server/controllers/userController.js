import { client } from "../index.js";
import { compareHash, hashPassword } from "../util/helper.js";
import { signJWT } from "../util/JwtHelpers.cjs";

export const userSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const passwordHash = await hashPassword(password);
        const values = [username, email, passwordHash];

        client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
            values,
            (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(400).json({ message: "signup failed", success: false })
                } else {
                    console.log(result)
                    res.status(200).json({ message: "User Creaeted", success: true })
                }
            });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error!" })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await client.query("SELECT * FROM users where email = $1 limit 1", [email]);
        const userInfo = result.rows[0];

        if (userInfo) {
            const isValidPassword = await compareHash(password, userInfo.password);

            if (isValidPassword) {
                const accessToken = await signJWT(
                    {
                        email: userInfo.email,
                        password: userInfo.password,
                    },
                    "1m"
                )

                const refreshToken = await signJWT(
                    {
                        email: userInfo.email,
                        password: userInfo.password,
                    },
                    "1h"
                )

                const addRefreshToken = client.query("UPDATE users SET refresh_token = $1 where email = $2", [refreshToken, userInfo.email])

                if (addRefreshToken && refreshToken && accessToken) {
                    const cookieOptions = {
                        sameSite: 'strict',
                        httpOnly:true,
                    }
                    res.cookie("access-token", accessToken, cookieOptions);
                    res.cookie("refresh-token", refreshToken, cookieOptions);
                    res.status(200).json({ message: "User Found!", success: true })
                }
            } else {
                res.status(400).json({ message: "Incorrect password!", type: "passwordError" });
            }
        } else {
            res.status(400).json({ message: "User not found!", success: false, type: "userError" });
        }
    } catch (error) {
        console.log(error.message)
    }
};


export const tokenRefresh = async (req, res) => {
    try {
        const { email: emailFromToken } = req.refreshToken;

        const checkDB = await client.query("SELECT refresh_token, email, password from users where email = $1", [emailFromToken]);
        const { email, password } = checkDB.rows[0];

        if (checkDB.rows[0] && (emailFromToken === email)) {
            const newAccessToken = await signJWT(
                {
                    email: email,
                    password: password,
                },
                "10s"
            )

            res.cookie("access-token", newAccessToken);
            return res.status(200).json({ message: "New Access token set!", newAccessToken });
        }

        res.clearCookie("refresh-token")
        res.clearCookie("access-token")
        res.status(401).json({ message: "Refresh token revoked!" });
        return
    } catch (error) {
        console.log("from token refresh", error.message);
        res.status(500).json({ message: "Server Error!" })
    }
}


export const getTodos = async (req, res) => {
    try {
        const todoArray = ["hello world", "whatsup", "I wanna be successful"];
        res.status(200).json({ todos: todoArray })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error!" })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("access-token")
        res.clearCookie("refresh-token")
        res.status(200).end();
    } catch (error) {
        console.log(error.message)
    }
}

