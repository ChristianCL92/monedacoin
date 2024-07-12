import bcrypt from 'bcryptjs';

export const hashPassword = (password) => { 
    return bcrypt.hashSync(password, 10);
}

export const validatePassword = (passwordVerify, userPassword) => { 
    return bcrypt.compare(passwordVerify, userPassword);
}
