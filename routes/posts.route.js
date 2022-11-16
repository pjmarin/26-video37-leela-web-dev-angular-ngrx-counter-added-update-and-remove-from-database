import { Router } from "express";
import { getPosts, addPost, updatePost, deletePost } from "../controllers/posts.controller.js";

const router = Router();

router.get("/getPosts", getPosts);
router.post("/addPost", addPost);
router.patch("/updatePost", updatePost);
router.delete("/deletePost/:id", deletePost);

export default router;