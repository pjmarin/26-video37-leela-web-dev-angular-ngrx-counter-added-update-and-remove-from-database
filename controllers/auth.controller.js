// import jwt from "jsonwebtoken";
import { generateToken, generateRefreshToken, tokenVerificationErrors } from "../utils/tokenManager.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";

export const register = async (req, res) => {
	const { email, password, repassword } = req.body;
	
	try {
		// const user = new User({email, password}); // solo para la alternativa 1, instanciamos el user primero, y despues directamente hariamos un await user.save() para guardarlo en mongo
		
		// alternativa 2 --> preguntar primero si el usuario existe antes de guardarlo
		let user = await User.findOne({email});
		if(user) {
			// throw({code: 11000});
			// return res.status(400).json({error: `El usuario ${email} ya existe !!!`, code: 11000});
			return res.status(400).json({error: `El usuario ya existe !!!`, code: 11000});
		}
		
		// si utilizamos la alternativa 2, debemos crear el user nuevo antes de guardarlo en mongo
		const newUser = new User({email, password});
		
		await newUser.save();

		const userSaved = await User.findOne({email});
		
		// Generar el token jwt
		const { token, expiresIn } = generateToken(userSaved._id);
		// Generar el refresh
		generateRefreshToken(userSaved._id, res);
		
		res.status(201).json({idToken: token, email, refreshToken, expiresIn: expiresIn, localId: userSaved._id, registered: true });
	} catch(err) {
		return res.status(500).json({error: `Server error: ${err}`});
		// alternativa 1 - utilizar el validador de mongo (cuando ponemos unique como propiedad en un campo del schema) 
		// y confiar en que cuando existe un user, el codigo de error siempre sera 11000
		//if(err.code === 11000) {
			//return res.status(400).json({ error: `Ya existe el usuario ${email}. Por favor crea un usuario nuevo.` });
		//}
		// return res.status(500).json({error: `Server error: ${err}`});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
			
		let user = await User.findOne({email});
		
		if(!user) {
			return res.status(401).json({status: "Unauthorized", error: `Error: El usuario no existe !!!`});
		}
		
		const respuestaPassword = await user.comparePassword(password);
		if(!respuestaPassword) {
			return res.status(400).json({error: `Usuario o contrasena incorrecto/a !!!`});
		}
		
		// Generar el token jwt
		const { token, expiresIn } = generateToken(user._id);
		// Generar el refresh
		const refreshToken = generateRefreshToken(user._id, res);

		res.status(200).send({idToken: token, email, refreshToken, expiresIn: expiresIn, localId: user._id, registered: true });
	} catch(err) {
		return res.status(500).json({error: `Ha habido algun error al intentar hacer login ${err}`});
	}
};

export const infoUser = async (req, res) => {	
	try {
		const user = await User.findById(req.uid).lean(); // .lean() nos devuelve un objeto plano de javascript en lugar de un objeto de mongo, por lo tanto la consulta es mas liviana
		res.status(200).json({id: user._id, user: user.email });
	} catch(err) {
		return res.status(500).json({error: `Ha habido algun error despues de haber pasado la validacion de token y dentro de la pagina protegida ${err}`});
	}	
};

export const refreshToken = (req, res) => {
	try {		
		const { token, expiresIn } = generateToken(req.uid);		
		return res.json({ token, expiresIn});
	} catch(err) {		
		return res
				.status(401)
				.send({ error: err.message });
	}
};

export const logout = (req, res) => {
	res.clearCookie("refreshToken");
	res.json({ message: "Logout successfully !!!" });
};