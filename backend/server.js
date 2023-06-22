import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js"
dotenv.config()

connectDB(); //connect to DB 

const port = process.env.PORT || 5000

const app = express()

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, console.log(`Server setup at ${process.env.NODE_ENV} mode at port ${port}`))