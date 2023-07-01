import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
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

app.use(notFound)
app.use(errorHandler)

app.listen(port, console.log(`Server setup at ${process.env.NODE_ENV} mode at port ${port}`))