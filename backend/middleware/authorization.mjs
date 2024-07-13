import jwt from "jsonwebtoken";
import User from "../models/UserModel.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";
import { asyncHandler } from "./asyncHandler.mjs";

 const protect = asyncHandler(async (req, res, next) => { 
        let token;
        if (req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decodedToken.id);

        if(!req.user){
             next( new ErrorResponse("authorization missing", 404))
        }
        next();
});

export default protect;