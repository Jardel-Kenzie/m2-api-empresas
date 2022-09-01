import cors from "cors"
import express from "express"
import database from "./database/index.js"

import authRouter from "./routes/auth.js"

const app = express()

app.use(cors())
app.set("trust proxy", true)
app.use(express.json())


app.use("/auth", authRouter)



app.use((error, request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    return response.json({
        status: "Error",
        message: error.message,  
    })
})

app.listen(6278, () => {
    console.log("App is running http://localhost:6278/ 🚀 ")
})