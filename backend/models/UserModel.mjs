import mongoose from "mongoose";
//import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({ 
    username: { 
        type: String, 
        required: [true, "Please provide a name"],
    },
    email: { 
        type: String, 
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
    },
    password: { 
        type: String, 
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false,
    },
    role: { 
        type: String, 
        enum: ["user", "admin"],
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) { 
    if (!this.isModified("password")) { 
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();

});

userSchema.methods.validatePassword = async function (passwordToVerify) { 
    return await bcrypt.compare(passwordToVerify, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_TTL, 

    });
}

export default mongoose.model("User", userSchema);
