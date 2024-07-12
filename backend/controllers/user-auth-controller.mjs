import User from '../models/UserModel.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';

export const register = asyncHandler (async(req, res, next) => {
    const { username, password, email, role } = req.body;

if(!username || !password || !email) { 
    return next(new ErrorResponse('username, password or email is missing', 400));
}
    
   const user = await User.create({username, password, email, role});

    tokenToSend(user, 201, res);

})

export const login = asyncHandler(async (req, res, next) => {

    try {

            const { email, password } = req.body;

            if (!email || !password) {
                
              return next(new ErrorResponse('Please provide correct credentials', 400));
            }

            const user = await User.findOne({ email }).select('+password');

            if(!user) {
                return next(new ErrorResponse('Invalid credentials', 401));
            }

            const isMatched = await user.validatePassword(password);

            if (!isMatched) {
              return next( new ErrorResponse('Invalid credentials', 401));
            }
            
             return tokenToSend(user, 200, res);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
;
});

export const getUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, statusCode: 200, data: user });
})

const tokenToSend = (user, statusCode, res) => { 
    const token = user.generateToken();
    res.status(statusCode).json({ success: true, statusCode, token });
}