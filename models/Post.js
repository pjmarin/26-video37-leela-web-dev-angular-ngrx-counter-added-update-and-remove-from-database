import mongoose from "mongoose";

const { Schema, model } = mongoose;

// const PostSchema = new mongoose.Schema({
// const PostSchema = Schema({
//     id: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         lowercase: true,
//         index: { unique: true },
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     }
// });

const PostSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

export const Post = model("Post", PostSchema);