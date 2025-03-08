import express from "express";
import { Book } from "./models/bookModel.js";
import  booksRoute  from "./routes/booksRoute.js";
import cors from 'cors';
import dotenv from 'dotenv'
import path from "path";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5555

const __dirname = path.resolve();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS
// OPTION 1: allow all origins with default of cors(*)
app.use(cors());

// OPTION 2: allow specific origins
// app.use(
//     cors(
//         {
//             origin: "https://localhost:5000",
//             methods: ["GET", "POST", "PUT", "DELETE"],
//             allowedHeaders: ["Content-Type", "Authorization"],
//         }
//     )
// );

// app.get("/", (req, res) =>{
//     console.log(req);
//     return res.status(234).send("Welcome to MERN stack course")
// })

app.use("/books", booksRoute);

// deployment process
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(port, ()=>{
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
});