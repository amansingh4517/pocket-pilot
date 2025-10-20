import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the structure of user data (user schema)
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Provide a name'],
            trim: true,
            minLength: [2, 'Name must be at least 2 characters'],
            maxLength: [20, 'Name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'Provide a password'],
            minLength: [6, 'Password must be at least 6 characters'],
            select: false //Password will not be returned by default when fetching users data from the database (extra security)
        }
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async (next) => {
    // Only hash if password is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hach(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async (enteredpassword) => {
    return await bcrypt.compare(enteredpassword, this.password);
};

// Create a model called User using the userSchema structure, and store data inside the users collection
const User = mongoose.model('User', userSchema);

export default User;
