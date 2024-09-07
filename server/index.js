import express from "express";
import pg from "pg";
import user_router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import admin_router from "./routes/adminRouter.js";
import morgan from "morgan";
import cors from "cors";

process.loadEnvFile();
const app = express();

const { Client } = pg;

export const client = new Client({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DATABASE,
    port:process.env.DB_PORT,
    password:process.env.DB_PWD
})


client.connect(()=>{
    console.log("DB connection opened");
    app.listen(process.env.PORT, () => {
        console.log("Server started\n")
    })
})

app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,DELETE",
    allowedHeaders:"Content-Type, Authorization",
    credentials:true,
    maxAge:20,
    preflightContinue:false,
}))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())
app.use(morgan("tiny"))

app.use("/",user_router);
app.use("/admin",admin_router);


app.use((err,req,res,next)=>{
    res.status(500).json({message:"Internal server error",error:err});
});