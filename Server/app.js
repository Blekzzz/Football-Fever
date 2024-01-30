if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}  

const express = require('express')
const router = require('./routes/router')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`She is ${PORT} miles away from you :(`);
})