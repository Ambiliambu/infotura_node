const express=require('express');
const app=express();
const connectDB=require('./config/db');
const dotenv=require('dotenv');

dotenv.config()
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get('/',(req,res)=>{
    res.send("Api Running")
})

app.use('/',require('./routes/useRoutes'))
app.use('/',require('./routes/adminRoutes'))


app.listen(process.env.PORT,()=>{
    console.log("Server Start");
})