import { validationResult, header, body, param, cookie } from "express-validator";
// import axios from "axios";

export const validationResultExpress = (req, res, next) => {
	const errors = validationResult(req);
	
	if(!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}
	
	next();
};

export const paramsLinkValidator = [
    param("id", "Formato id incorrecto")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

// Opcion 1 - validar con axios que la url existe
// export const bodyLinkValidator = [
//     body("longLink", "Formato de enlace incorrecto")
//         .trim()
//         .notEmpty()
//         .custom(async (value) => {
//             try {
//                 if (!value.startsWith("http")) {
//                     value = "https://" + value;
//                 }
//                 await axios.get(value);
//                 return value;
//             } catch (error) {
//                 throw new Error("Link 404 not found");
//             }
//         }),
//     validationResultExpress
// ];

// Opcion 2 - usar el metodo .isURL() del validador de express
export const bodyLinkValidator = [
    body("longLink", "Formato de enlace incorrecto")
        .trim()
        .notEmpty()
        .isURL(),
    validationResultExpress
];



// la variable body dentro del array se coge del express.validator
// body en realidad es tambien un middleware, por eso podemos agregar 
// al final del array el ultimo middleware, que es validationResultExpress
export const bodyRegisterValidator = [ 
    body("email", "Formato de email incorrecto !!!").trim().isEmail().normalizeEmail(),
    body("password", "Contrasena minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 })
        .custom((value, { req }) => {
            if(!req.body.repassword) {
                throw new Error("Error: No se ha repetido la contrasena");
            }
            
            if (value !== req.body.repassword) {
                throw new Error("Error: No coinciden las contrasenas");
            }
            
            return value;
        }),
    validationResultExpress
];

// la variable body dentro del array se coge del express.validator
// body en realidad es tambien un middleware, por eso podemos agregar 
// al final del array el ultimo middleware, que es validationResultExpress
export const bodyLoginValidator = [
    body("email", "Ingrese un email valido")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Contrasena minimo 6 carácteres")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
];

export const tokenHeaderValidator = [
    header("authorization", "No existe el token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const tokenCookieValidator = [
    cookie("refreshToken", "No existe refresh Token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const paramNanoLinkValidator = [
    param("nanoLink", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];