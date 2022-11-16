import mongoose from "mongoose";
const { Schema } = mongoose;

// Aqui usamos uid como una clave foranea (FOREIGN KEY) en sql, el nombre User que tenemos como valor de la propiedad ref
// coincide con el nombre que le hemos dado al modelo User en el archivo /models/User.js --> model("User", userSchema);

const linkSchema = new Schema({
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",        
        required: true,
    },
});

export const Link = mongoose.model("Link", linkSchema);