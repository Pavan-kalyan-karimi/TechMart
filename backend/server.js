import path from "path"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

import cookieParser from "cookie-parser"

dotenv.config()

connectDB(); //connect to DB 

const port = process.env.PORT || 5000

const app = express()

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes)
app.use('/api/users', userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve();//set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    //any route that is not api will be reirected to index.html
    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('API Is running...');
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, console.log(`Server setup at ${process.env.NODE_ENV} mode at port ${port}`))