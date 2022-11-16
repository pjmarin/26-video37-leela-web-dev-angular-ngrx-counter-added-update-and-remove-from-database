import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import postsRouter from "./routes/posts.route.js";

// import bodyParser from "body-parser";

const app = express();

app.use(function (req, res, next) {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
});

// app.use(cors({ origin:true, credentials:true }));

app.use(
    cors({
        origin: function(origin, callback) {
          const whiteList = process.env.ORIGIN1.split(",");
          whiteList.map(string => string.trim());

          if (whiteList.includes(origin) !== -1) {
              return callback(null, origin); // el primer argumento es el error (si la IP de origen no esta dentro de nuestro array)
          }
          return callback("No autorizado por CORS"); // el primer argumento es el error (si la IP de origen no esta dentro de nuestro array)
        },
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '3mb'}));

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  if(req.originalUrl.includes("api") || req.originalUrl.includes("html")) {
    console.log(`pasamos por aqui - todas las peticiones - ${req.originalUrl} - ${new Date(Date.now()).toISOString()}`);
  }
  
  next();
});

app.use("/api/v1/auth", authRoutes);

// app.use("/posts", (req, res) => {
//   console.log("pasamos por aqui - posts endpoint");
//   // return [
//   //   { id: "1", title: "post 1 example", description: "getting post 1 from express" }
//   // ]; 
//   return res.status(200).json([ { id: "1", title: "post 1 example", description: "getting post 1 from express" } ]);
// });

app.use("/posts", postsRouter);



app.use(express.static("public/src"));

app.use(function(err, req, res, next) {
  console.error("err.stack", err.stack);
  return res.send(500, { message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("😍😍😲 http://localhost:" + PORT));