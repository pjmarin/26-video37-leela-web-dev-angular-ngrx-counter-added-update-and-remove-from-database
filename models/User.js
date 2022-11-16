import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

// const userSchema = new mongoose.Schema({
const userSchema = Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    }
});

// aqui no podemos usar una arrow function porq. necesitamos tener acceso a this
// con este interceptor, hasheamos la contrasena siempre, tanto al guardar por primera vez como al modificar (*)
userSchema.pre("save", async function(next) {
    const user = this;

	// (*)
    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        throw new Error("Error al codificar la contrasena");
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);