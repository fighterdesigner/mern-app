require("dotenv").config()
const express = require("express")
const app = express()
const {errorHandler} = require("./middlewares/errorMiddleware")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const connectToDb = require("./config/db")

// connect to mongo db
connectToDb()

app.use("/api/todolist", require('./routes/todoListRoute'))
app.use("/api/user", require('./routes/userRoute'))

app.use(errorHandler)
app.listen(port, () => console.log(`server is running on port ${port}`))