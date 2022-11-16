import { Post } from "../models/Post.js";

export const getPosts = async (req, res) => {
	try {			
		const posts = await Post.find({});
		return res.status(200).json(posts);
	} catch(err) {
		return res
			.status(401)
			.send({ error: err.message });
	}
};

export const addPost = async (req, res) => {
	try {
		const { title, description } = req.body;	
		const newPost = new Post({ title, description });
		
		await newPost.save();
		return res.status(200).json(newPost);
	} catch(err) {
		return res
			.status(401)
			.send({ error: err.message });
	}
};

export const updatePost = async (req, res) => {
	try {

		const id = Object.keys(req.body)[0];
				
		const { title, description } = Object.values(req.body)[0];
		const post = await Post.findById(id);

		if (!post) return res.status(404).json({ error: "No existe el post" });

		post.title = title;
		post.description = description;

		await post.save();

		return res.status(200).json({ post });
	} catch(err) {
		return res
			.status(401)
			.send({ error: err.message });
	}
};

export const deletePost = async (req, res) => {
	try {

		const { id } = req.params;
				
		// const { title, description } = Object.values(req.body)[0];
		const post = await Post.findById(id);

		if (!post) return res.status(404).json({ error: "No existe el post" });

		// post.title = title;
		// post.description = description;

		await post.deleteOne({ id }, function (err) {
			if (err) {
				console.log("Error trying to delete post: ", err);
				if(err.message) {
					console.log("Error trying to delete post: ", err.message);
				}
				return handleError(err);
			}
		});

		return res.status(200).json({ message: "pasamos por aqui - delete post" });
	} catch(err) {
		return res
			.status(401)
			.send({ error: err.message });
	}
};