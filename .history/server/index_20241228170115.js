import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db';

dotenv.config();
const app = express();


const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    connectDb();
    console.log(` server running in : http:localhost:${PORT}`)
})