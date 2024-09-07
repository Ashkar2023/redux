import { verifyJWT } from "../util/JwtHelpers.cjs";

export const verifyAccessToken = async(req,res,next)=>{
    try {
        const verified = await verifyJWT(req.cookies['access-token']);
        if(verified){
            next();
        }
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const verifyRefreshToken = async(req,res,next)=>{
    try {
        const verified = await verifyJWT(req.cookies['refresh-token']);
        if(verified){
            req.refreshToken = verified;
            next();
        }
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Refresh token', reAuthenticate:true });
    }
}