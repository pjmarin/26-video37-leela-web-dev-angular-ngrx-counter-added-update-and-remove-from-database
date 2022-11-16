import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
    const expiresIn = 60 * 15; // 15 minutes in seconds
    // const expiresIn = 30; // 30 seconds

    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log("Ha habido algun error al intentar generar el token", error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30; // 30 dias expresado en segundos
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });

		// En este caso es seguro guardar el token en cookies porque lo que guardamos es el refresh token (el cual no da acceso a las peticiones) 
		// en lugar del token normal (si tiene acceso a las peticiones). Los token generados son distintos ya que en el refresh utilizamos process.env.JWT_REFRESH 
		// y en el token normal usamos process.env.JWT_SECRET
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            // secure: true,
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: "lax",
        });

        return refreshToken;
    } catch (error) {
        console.log("Ha habido algun error al intentar refrescar el token: ", error);
    }
};

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};