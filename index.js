require('dotenv').config()

const express=require('express')
const cors=require('cors')
const db=require('./DB/connection')
const router=require('./Router/router')

const pfSever=express()

pfSever.use(cors())
pfSever.use(express.json())
pfSever.use(router)

const port=4000||process.env.port

pfSever.listen(port,()=>{
    console.log('listening on port ',port);
})

pfSever.get('/',(req,res)=>{
    console.log(`pfserver started`);
})